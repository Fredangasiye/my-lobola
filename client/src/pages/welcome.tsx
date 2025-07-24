import { SignInButton, SignUpButton } from "@clerk/clerk-react"; // Import Clerk's buttons
import { Heart } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
      <div className="max-w-2xl">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="text-4xl">🇿🇦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">My Lobola</h1>
          <Heart className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Cultural guidance for respectful lobola traditions across South African communities.
        </p>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-500 mb-6">
            To access the calculator and AI-powered guidance, please sign in or create a free account. It's quick, easy, and only happens once.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 
              THIS IS THE FIX: We are now using Clerk's special buttons.
            */}
            <SignInButton mode="modal">
              <button className="bg-green-700 text-white font-semibold py-3 px-8 rounded-lg w-full sm:w-auto hover:bg-green-800 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
               <button className="bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg w-full sm:w-auto hover:bg-gray-300 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}