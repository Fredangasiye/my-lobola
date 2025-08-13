import { useState } from "react";
import { Share2, MessageCircle, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { CalculationResult } from "shared/schema";

interface ShareSectionProps {
  results: CalculationResult;
}

export default function ShareSection({ results }: ShareSectionProps) {
  const { toast } = useToast();

  const shareWhatsApp = () => {
    const message = `My Lobola price is : ${results.amount} or 5 whole cows\nCalculated yours at ${window.location.origin}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Lobola Results',
          text: 'Check out my lobola calculation results',
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "The link has been copied to your clipboard.",
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Share2 className="text-warm-orange mr-3" />
        Share Results
      </h2>
      <div className="space-y-3">
        <Button 
          onClick={shareWhatsApp}
          className="w-full flex items-center justify-start space-x-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Share on WhatsApp</span>
        </Button>
        <Button 
          onClick={shareGeneral}
          className="w-full flex items-center justify-start space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4"
        >
          <Link className="h-5 w-5" />
          <span className="text-sm font-medium">Copy Link</span>
        </Button>
      </div>
    </div>
  );
}
