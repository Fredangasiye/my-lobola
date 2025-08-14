import { useState, useEffect } from "react";
import { Lightbulb, Sparkles, Loader2, Share2, MessageCircle, Link, Twitter, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export default function UncleWisdom() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freeAnswersRemaining, setFreeAnswersRemaining] = useState(2);
  const [showUnlockOptions, setShowUnlockOptions] = useState(false);
  const [completedShares, setCompletedShares] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Load completed shares from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('uncle-wisdom-shares');
    if (saved) {
      setCompletedShares(new Set(JSON.parse(saved)));
    }
  }, []);

  const saveCompletedShares = (shares: Set<string>) => {
    localStorage.setItem('uncle-wisdom-shares', JSON.stringify([...shares]));
    setCompletedShares(shares);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    if (freeAnswersRemaining <= 0) {
      setShowUnlockOptions(true);
      toast({
        title: "Unlock More Questions",
        description: "Share the app to unlock more Uncle Wisdom questions!",
      });
      return;
    }
    
    setIsLoading(true);
    setAskedQuestion(question);
    
    try {
      const response = await fetch('/api/uncle-wisdom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          culturalGroup: 'general' // Can be enhanced to detect cultural group
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Uncle Wisdom');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAnswer(data.answer);
      setFreeAnswersRemaining(prev => prev - 1);
      
      toast({
        title: "Uncle Wisdom has spoken",
        description: "Cultural wisdom has been shared with you.",
      });
      
    } catch (error) {
      console.error('Uncle Wisdom API Error:', error);
      setAnswer("Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This tool is meant to start conversations, not replace them.");
      
      toast({
        title: "Connection issue",
        description: "Using fallback wisdom. Please consult with family elders for personalized guidance.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  const shareWhatsApp = () => {
    const message = `🌟 Get cultural wisdom from Uncle Wisdom! Ask questions about lobola traditions and get AI-powered guidance. Try it now: ${window.location.origin}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    unlockQuestions('whatsapp');
  };

  const shareTwitter = () => {
    const message = `🌟 Get cultural wisdom from Uncle Wisdom! Ask questions about lobola traditions and get AI-powered guidance. Try it now: ${window.location.origin}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
    unlockQuestions('twitter');
  };

  const shareFacebook = () => {
    const message = `🌟 Get cultural wisdom from Uncle Wisdom! Ask questions about lobola traditions and get AI-powered guidance. Try it now: ${window.location.origin}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, '_blank');
    unlockQuestions('facebook');
  };

  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Uncle Wisdom - Cultural AI Guide',
          text: '🌟 Get cultural wisdom from Uncle Wisdom! Ask questions about lobola traditions and get AI-powered guidance.',
          url: window.location.origin
        });
        unlockQuestions('native');
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}\n\n🌟 Get cultural wisdom from Uncle Wisdom! Ask questions about lobola traditions and get AI-powered guidance.`);
        toast({
          title: "Link Copied!",
          description: "Share the link to unlock more questions.",
        });
        unlockQuestions('copy');
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const unlockQuestions = (method: string) => {
    if (completedShares.has(method)) {
      toast({
        title: "Already Completed",
        description: "You've already unlocked questions with this method. Try another!",
      });
      return;
    }

    const newShares = new Set(completedShares);
    newShares.add(method);
    saveCompletedShares(newShares);
    
    setFreeAnswersRemaining(prev => prev + 2);
    setShowUnlockOptions(false);
    
    toast({
      title: "Questions Unlocked! 🎉",
      description: `You've unlocked 2 more questions by sharing on ${method}!`,
    });
  };

  return (
    <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-2xl">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
            <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">Ask Uncle Wisdom</div>
            <div className="text-sm text-gray-600">Cultural AI Guide</div>
          </div>
          <span className="ml-auto text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
            AI-Powered
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 border rounded-lg bg-secondary">
          <p className="font-semibold">Uncle Wisdom - Cultural AI Guide</p>
          <p className="text-sm text-gray-600 mt-2">
            Ask questions about lobola traditions and get culturally sensitive guidance
          </p>
                                <p className="text-xs text-gray-500 mt-1">
                        Questions remaining: {freeAnswersRemaining}
                      </p>
          {completedShares.size > 0 && (
            <p className="text-xs text-green-600 mt-1">
              Unlocked {completedShares.size * 2} questions through sharing! 🎉
            </p>
          )}
        </div>
        
        <Textarea 
          placeholder="Ask Uncle Wisdom anything about lobola traditions..." 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
                              disabled={isLoading || freeAnswersRemaining <= 0}
        />
        
        <Button 
          onClick={handleAskQuestion} 
          className="w-full"
                              disabled={isLoading || !question.trim() || freeAnswersRemaining <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uncle Wisdom is thinking...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Ask Uncle Wisdom
            </>
          )}
        </Button>
        
        {(askedQuestion || answer) && (
          <div className="mt-4 p-4 border rounded-lg space-y-4">
            {askedQuestion && (
              <div>
                <p className="font-semibold text-sm text-gray-600">Your Question:</p>
                <p className="text-gray-800">{askedQuestion}</p>
              </div>
            )}
            {answer && (
              <div>
                <p className="font-semibold text-sm text-gray-600 flex items-center gap-2">
                  <span role="img" aria-label="wise elder">👴🏿</span> 
                  Uncle Wisdom's Answer:
                </p>
                <p className="text-gray-800">{answer}</p>
              </div>
            )}
          </div>
        )}

        {showUnlockOptions && (
          <div className="mt-4 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="font-semibold text-center mb-3 text-gray-800">
              🌟 Unlock More Questions!
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              Share Uncle Wisdom with others to unlock 2 more questions per method
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={shareWhatsApp}
                disabled={completedShares.has('whatsapp')}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">WhatsApp</span>
                {completedShares.has('whatsapp') && <span className="text-xs">✓</span>}
              </Button>
              
              <Button 
                onClick={shareTwitter}
                disabled={completedShares.has('twitter')}
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="h-4 w-4" />
                <span className="text-xs">Twitter</span>
                {completedShares.has('twitter') && <span className="text-xs">✓</span>}
              </Button>
              
              <Button 
                onClick={shareFacebook}
                disabled={completedShares.has('facebook')}
                className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Facebook className="h-4 w-4" />
                <span className="text-xs">Facebook</span>
                {completedShares.has('facebook') && <span className="text-xs">✓</span>}
              </Button>
              
              <Button 
                onClick={shareGeneral}
                disabled={completedShares.has('native') && completedShares.has('copy')}
                className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs">Share</span>
                {(completedShares.has('native') || completedShares.has('copy')) && <span className="text-xs">✓</span>}
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Completed: {completedShares.size}/4 methods
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
