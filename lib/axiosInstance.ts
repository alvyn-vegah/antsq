// lib/axios.ts
import axios from "axios";

// Ensure we always use the correct domain
// const getBaseURL = () => {
//   // If we're in the browser and the current domain is antsq.com, use the current domain
//   if (typeof window !== 'undefined') {
//     const currentDomain = window.location.origin;
//     if (currentDomain.includes('antsq.com')) {
//       return `${currentDomain}/api`;
//     }
//   }
  
//   // Fallback to environment variable or default
//   return process.env.NEXT_PUBLIC_API_BASE_URL;
// };

const axiosInstance = axios.create({
  baseURL: "https://antsq.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;