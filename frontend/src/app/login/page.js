import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading login...</div>}>
      <LoginClient />
    </Suspense>
  );
}
