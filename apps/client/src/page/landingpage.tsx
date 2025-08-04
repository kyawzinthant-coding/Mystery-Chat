import { MessageCircle, Users, Zap, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Link, Navigate, useNavigate } from "react-router";
import heroImage from "@/assets/mystery-hero.jpg";
import { useAuth } from "@clerk/clerk-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="text-center h-[80vh] flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/chat" replace />;
  }

  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Messaging",
      description: "Instant communication with cryptographic precision",
    },
    {
      icon: Users,
      title: "Mystery Circles",
      description: "Join exclusive chat rooms and secret gatherings",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Messages travel through the mystical realm instantly",
    },
    {
      icon: Shield,
      title: "Encrypted Secrets",
      description: "Your conversations protected by ancient ciphers",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/60" />
      {/* Mysterious gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mystery opacity-40" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Theme toggle */}
      {/* <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div> */}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Hero section */}
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-accent bg-clip-text text-[#EFC139]">
              Mystery Chat
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-accent" />
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enter the realm of enigmatic conversations. Where secrets unfold
              and mysteries are shared.
            </p>
          </div>

          <Link to="/sign-in">
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="bg-[#EFC139] cursor-pointer hover:bg-primary-glow-2/3 text-primary-foreground px-12 py-6 text-lg font-semibold shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary-glow))] transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="mr-0 h-6 w-6" />

              <span className="text-md">Start Chatting</span>
            </Button>
          </Link>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-6xl w-full">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-card hover:shadow-mystery transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#EFC139]/10 border border-[#EFC139]/20">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground ">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
