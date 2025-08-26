import CustomRequests from "@/sections/admin/custom-requests";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


// Main Admin Page Component
const Page = () => {
  
  return (
    <CustomRequests />
  );
}

export default Page;
