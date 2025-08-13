import { useState } from "react";
import { Lightbulb, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export default function UncleWisdom() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freeAnswersRemaining, setFreeAnswersRemaining] = useState(5);
  const { toast } = useToast();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    if (freeAnswersRemaining <= 0) {
      toast({
        title: "No free answers remaining",
        description: "You've used all your free questions. Please consult with family elders for more guidance.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAskedQuestion(question);
    
    try {
      const response = await fetch('/api/ai-chat', {
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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span> 
          Ask Uncle Wisdom
          <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
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
            Free answers remaining: {freeAnswersRemaining}
          </p>
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
      </CardContent>
    </Card>
  );
}
