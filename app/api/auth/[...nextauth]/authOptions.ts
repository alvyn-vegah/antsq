import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User,Account } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const client = await clientPromise;
        const db = client.db("antsq");
        const user = await db.collection("users").findOne({ email: credentials.email });
      
        if (!user || user.authProvider !== "local") return null;
      
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
      
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          privilege: user.privilege || "user", // Use privilege from DB
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as "jwt" | "database"
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      // profile,
      // email,
      // credentials,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      // profile?: Profile;
      // email?: { verificationRequest?: boolean };
      // credentials?: Record<string, unknown>;
    }): Promise<boolean> {
      if (account?.provider === "google") {
        const client = await clientPromise;
        const db = client.db("antsq");
        const users = db.collection("users");
        const existingUser = await users.findOne({ email: user?.email });
    
        if (!existingUser) {
          await users.insertOne({
            name: user?.name,
            email: user?.email,
            privilege: "user",
            authProvider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string ?? "",
          email: token.email,
          name: token.name,
          privilege: token.privilege as string | undefined, // Pass privilege to session
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: unknown }) {
      if (user && typeof user === "object" && user !== null) {
        const u = user as { id?: string; email?: string; name?: string; privilege?: string };
        if (u.id) token.id = u.id;
        if (u.email) token.email = u.email;
        if (u.name) token.name = u.name;
        if (u.privilege) token.privilege = u.privilege; // Pass privilege to token
      }
      return token;
    }
  }
}; 


// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
//         const client = await clientPromise;
//         const db = client.db("antsq");
//         const user = await db.collection("users").findOne({ email: credentials.email });
      
//         if (!user || user.authProvider !== "local") return null;
      
//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;
      
//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         };
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt" as "jwt" | "database"
//   },
//   secret:process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token) {
//         session.user = {
//           ...session.user,
//           id: token.id as string | undefined,
//           email: token.email,
//           name: token.name,
//         };
//       }
//       return {
//         ...session,
//         expires: session.expires,
//         user: session.user,
//       };
//     },
//     async jwt({ token, user }: { token: JWT; user?: unknown }) {
//       if (user && typeof user === "object" && user !== null) {
//         const u = user as { id?: string; email?: string; name?: string };
//         if (u.id) token.id = u.id;
//         if (u.email) token.email = u.email;
//         if (u.name) token.name = u.name;
//       }
//       return token;
//     }
//   }
  
//   // ...other NextAuth config
// }; 