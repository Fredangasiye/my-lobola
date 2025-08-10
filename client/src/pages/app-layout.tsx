import Calculator from "./calculator";
import { Heart } from "lucide-react";

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
            <span className="text-white text-sm">Demo Mode</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Calculator />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
            {/* ... your footer content ... */}
        </div>
      </footer>
    </div>
  );
}