import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"; // Import SignInButton
import Calculator from "./calculator";
import WelcomePage from "./welcome";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              {/* 
                THIS IS THE FIX: We are using Clerk's own button.
                mode="modal" makes it a beautiful pop-up, which is a better user experience.
              */}
              <SignInButton mode="modal">
                <button className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SignedOut>
          <WelcomePage />
        </SignedOut>
        <SignedIn>
          <Calculator />
        </SignedIn>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        {/* ... your footer ... */}
      </footer>
    </div>
  );
}