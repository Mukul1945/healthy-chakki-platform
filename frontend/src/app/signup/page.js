import { Suspense } from "react";
import SignupClient from "./SignupClient";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading signup...</div>}>
      <SignupClient />
    </Suspense>
  );
}
