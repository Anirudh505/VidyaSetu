import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="clerk-page">
      <SignUp
        routing="path"
        path="/signup"
        afterSignUpUrl="/onboarding"
        fallbackRedirectUrl="/onboarding"
        signInUrl="/login"
      />
    </div>
  );
}
