// declare module "next-auth" {
//   interface User {
//     id?: string;
//   }
//   interface Session {
//     user?: {
//       id?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       privilege?:string | null;
//     };
//     expires: string;
//   }
// }

// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      privilege?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    privilege?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    name?: string;
    privilege?: string;
  }
}
