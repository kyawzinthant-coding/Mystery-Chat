import { SignUp } from "@clerk/clerk-react";
import heroImage from "@/assets/mystery-hero.jpg";
import { Eye, Crown, Star, Moon } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero background with mystical overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Mystical gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-purple-900/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-800/70 to-slate-900/90" />
      
      {/* Floating mystical elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/8 rounded-full blur-2xl animate-pulse" />
      
      {/* Animated mystical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {i % 4 === 0 && <Star className="w-1.5 h-1.5 text-amber-400/30" />}
            {i % 4 === 1 && <Eye className="w-1.5 h-1.5 text-purple-400/30" />}
            {i % 4 === 2 && <Crown className="w-1.5 h-1.5 text-blue-400/30" />}
            {i % 4 === 3 && <Moon className="w-1.5 h-1.5 text-emerald-400/30" />}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            {/* Mystical symbol */}
            <div className="relative mx-auto w-fit">
              <Eye className="h-12 w-12 text-amber-400 mx-auto animate-pulse drop-shadow-2xl" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Join the Mystical Nexus
              </h1>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
                <Crown className="h-3 w-3 text-amber-400" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                Begin your journey as a <span className="text-amber-400 font-semibold">Beyonder</span>
              </p>
            </div>
          </div>

          {/* Sign Up Form Container */}
          <div className="relative">
            {/* Glow effect behind the form */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl" />
            
            <SignUp
              afterSignUpUrl="/chat"
              appearance={{
                elements: {
                  // Main card styling
                  card: "bg-slate-800/90 backdrop-blur-xl border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 rounded-2xl",
                  
                  // Header styling
                  headerTitle: "text-amber-400 font-bold text-xl",
                  headerSubtitle: "text-slate-300 text-sm",
                  
                  // Form elements
                  formFieldLabel: "text-slate-200 font-medium text-sm",
                  formFieldInput: "bg-slate-700/70 border-slate-600/50 text-slate-100 focus:border-amber-500/70 focus:ring-amber-500/30 rounded-lg transition-all duration-300",
                  formFieldInputShowPasswordButton: "text-slate-400 hover:text-amber-400",
                  
                  // Buttons
                  formButtonPrimary: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-900 font-semibold shadow-lg shadow-amber-500/25 transition-all duration-300 rounded-lg",
                  
                  // Social buttons
                  socialButtonsBlockButton: "bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/70 hover:border-amber-500/50 transition-all duration-300 rounded-lg",
                  socialButtonsBlockButtonText: "text-slate-200 font-medium",
                  
                  // Links
                  footerActionLink: "text-amber-400 hover:text-amber-300 font-medium transition-colors duration-300",
                  
                  // Divider
                  dividerLine: "bg-slate-600/50",
                  dividerText: "text-slate-400 text-sm",
                  
                  // Footer
                  footer: "hidden", // Hide the default footer
                  
                  // Form field wrapper
                  formField: "space-y-2",
                  
                  // Error messages
                  formFieldError: "text-red-400 text-sm",
                  
                  // Loading state
                  spinner: "text-amber-400",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  showOptionalFields: true,
                },
                variables: {
                  colorPrimary: "#f59e0b", // amber-500
                  colorBackground: "rgba(30, 41, 59, 0.9)", // slate-800/90
                  colorInputBackground: "rgba(51, 65, 85, 0.7)", // slate-700/70
                  colorInputText: "#f1f5f9", // slate-100
                  colorText: "#e2e8f0", // slate-200
                  colorTextSecondary: "#cbd5e1", // slate-300
                  colorNeutral: "#64748b", // slate-500
                  borderRadius: "0.75rem", // rounded-xl
                }
              }}
            />
          </div>

          {/* Bottom mystical quote */}
          <div className="text-center mt-8">
            <div className="p-4 border border-amber-500/20 rounded-lg bg-gradient-to-r from-amber-900/10 to-orange-900/10 backdrop-blur-sm">
              <p className="text-slate-400 italic text-sm leading-relaxed">
                "Every mystery has its beginning, and yours starts here."
              </p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <Crown className="h-3 w-3 text-amber-400/70" />
                <p className="text-xs text-amber-400/70 font-medium">— Welcome, Future Sequence Holder</p>
              </div>
            </div>
          </div>

          {/* Additional mystical elements */}
          <div className="flex justify-center space-x-8 mt-6 opacity-30">
            <div className="flex flex-col items-center space-y-1">
              <Eye className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-slate-500">Sequence 9</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Star className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-500">Mystical</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Crown className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-500">Ascension</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;