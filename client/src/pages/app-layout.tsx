import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import Calculator from "./calculator";
import WelcomePage from "./welcome";
import { Heart } from "lucide-react";

export default function AppLayout() {
  // This hook safely tells us if Clerk is done loading and if the user is signed in.
  const { isLoaded, isSignedIn } = useUser();

  // THIS IS THE FIX: While Clerk is initializing, we show a simple loading state.
  // This prevents any rendering crashes.
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* We can still use a simple check for the button */}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/"/>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg">Sign In</button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 
          This is a simple, crash-proof way to decide which page to show.
          It replaces the fragile <SignedIn> and <SignedOut> layout components.
        */}
        {isSignedIn ? <Calculator /> : <WelcomePage />}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Ubuntu Lobola Guide</h3>
            <p className="text-gray-300 text-sm">Respecting traditions, embracing modern values</p>
            <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-gray-400 text-xs">This tool is for educational and guidance purposes only. Always consult with family elders and cultural advisors for important decisions.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}