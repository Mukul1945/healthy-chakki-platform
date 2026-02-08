// Backend API base URL (set in .env.local as NEXT_PUBLIC_API_URL)
export const API_BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || ""
    : process.env.NEXT_PUBLIC_API_URL || "";
