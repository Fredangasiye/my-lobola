import Calculator from "./calculator";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AppLayout() {
  const { toast } = useToast();

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Lobola Calculator',
          text: 'Calculate traditional African bride price with cultural guidance',
          url: window.location.origin
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        toast({
          title: "Link Copied",
          description: "The app link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={shareApp}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-black border-gray-300"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share App</span>
            </Button>
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