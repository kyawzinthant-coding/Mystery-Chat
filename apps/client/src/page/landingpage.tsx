import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  Loader2,
  Eye,
  Crown,
  Moon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, Navigate } from "react-router";
import heroImage from "@/assets/mystery-hero.jpg";
import { useAuth } from "@clerk/clerk-react";

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-amber-400 animate-spin mx-auto" />
          <p className="text-slate-400">Connecting to the Gray Fog...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/chat" replace />;
  }

  const features = [
    {
      icon: MessageCircle,
      title: "Mystical Communication",
      description:
        "Send messages through the spirit world with supernatural precision",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30",
    },
    {
      icon: Users,
      title: "Tarot Club Gatherings",
      description:
        "Join exclusive circles above the Gray Fog for secret discussions",
      gradient: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Zap,
      title: "Beyonder Speed",
      description:
        "Messages transcend time and space, delivered instantaneously",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Shield,
      title: "Ancient Encryption",
      description: "Protected by mystical seals known only to the initiated",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero background with mystical overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Mystical gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-800/60 to-slate-900/80" />

      {/* Floating mystical elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {i % 4 === 0 && <Star className="w-2 h-2 text-amber-400/40" />}
            {i % 4 === 1 && <Eye className="w-2 h-2 text-purple-400/40" />}
            {i % 4 === 2 && <Crown className="w-2 h-2 text-blue-400/40" />}
            {i % 4 === 3 && <Moon className="w-2 h-2 text-emerald-400/40" />}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Hero section */}
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-6">
            {/* Mystical symbol */}
            <div className="relative mx-auto w-fit">
              <Eye className="h-16 w-16 text-amber-400 mx-auto animate-pulse drop-shadow-2xl" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
              Mystical Nexus
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Crown className="h-4 w-4 text-amber-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Step beyond the veil into a realm of{" "}
              <span className="text-amber-400 font-semibold">
                mystical communication
              </span>
              . Where ancient secrets unfold and the initiated gather above the
              Gray Fog.
            </p>

            <p className="text-sm text-slate-400 italic">
              "In the depths of mystery, only the worthy shall find truth"
            </p>
          </div>

          <Link to="/sign-in">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-900 px-12 py-6 text-lg font-bold shadow-2xl shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-amber-500/40 border-2 border-amber-400/30"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center space-x-3">
                <Eye className="h-6 w-6 group-hover:animate-pulse" />
                <span>Enter the Mystical Realm</span>
                <Crown className="h-4 w-4 opacity-70" />
              </div>
            </Button>
          </Link>

          <p className="text-xs text-slate-500 mt-4">
            Join the ranks of Beyonders and Sequence holders
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-6xl w-full">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group p-6 bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border ${feature.borderColor} shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden`}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center text-center space-y-4">
                <div
                  className={`p-4 rounded-full bg-slate-800/50 border-2 ${feature.borderColor} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon
                    className={`h-8 w-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Mystical sequence number */}
                <div className="absolute top-2 right-2 text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                  Seq: {index}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom mystical quote */}
        <div className="mt-16 max-w-2xl text-center">
          <div className="p-6 border border-amber-500/30 rounded-lg bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-sm shadow-lg">
            <p className="text-slate-300 italic leading-relaxed">
              "Beyond the fog lies a realm where thoughts become reality, and
              communication transcends the mortal coil. Welcome, fellow seeker
              of mysteries."
            </p>
            <div className="flex items-center justify-center mt-3 space-x-2">
              <Crown className="h-3 w-3 text-amber-400" />
              <p className="text-xs text-amber-400 font-semibold">
                — The Fool, Sequence 0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
