// client/src/pages/app-layout.tsx
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "wouter";
import Calculator from "./calculator";
import WelcomePage from "./welcome";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream">
      {/* --- The Header --- */}
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <a className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg cursor-pointer">Sign In</a>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* --- The Main Content Area --- */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <SignedOut>
          <WelcomePage />
        </SignedOut>
        <SignedIn>
          <Calculator />
        </SignedIn>
      </main>

      {/* --- The Footer --- */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Ubuntu Lobola Guide</h3>
            <p className="text-gray-300 text-sm">
              Respecting traditions, embracing modern values
            </p>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-xs">
              This tool is for educational and guidance purposes only. 
              Always consult with family elders and cultural advisors for important decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}