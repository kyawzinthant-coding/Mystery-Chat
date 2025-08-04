import { SignUp } from "@clerk/clerk-react";
import heroImage from "@/assets/mystery-hero.jpg";

const SignUpPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 bg-background/60" />

      <div className="absolute inset-0 bg-gradient-mystery opacity-40" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          <SignUp
            afterSignOutUrl="/chat"
            appearance={{
              elements: {
                card: "bg-card/80 backdrop-blur-sm border-border/50 shadow-card",
                headerTitle: "text-primary font-bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
