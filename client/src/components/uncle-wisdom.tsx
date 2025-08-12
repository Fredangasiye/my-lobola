import { useState } from "react";
import { Lightbulb, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function UncleWisdom() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freeAnswersRemaining, setFreeAnswersRemaining] = useState(1);
  const { toast } = useToast();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    if (freeAnswersRemaining <= 0) {
      toast({
        title: "No Free Answers Remaining",
        description: "You've used your free answer. Please consult with your family elders for further guidance.",
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
          language: 'en'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAnswer(data.answer);
      setFreeAnswersRemaining(prev => prev - 1);
      setQuestion("");
      
      toast({
        title: "Uncle Wisdom Responded",
        description: "Your question has been answered with cultural wisdom.",
      });

    } catch (error) {
      console.error('Error asking Uncle Wisdom:', error);
      setAnswer("I apologize, but I am unable to provide guidance at this time. Please consult with your family elders for the best advice. This tool is meant to start conversations, not replace them.");
      toast({
        title: "Unable to Connect",
        description: "Please try again later or consult with your family elders.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span> Ask Uncle Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 border rounded-lg bg-secondary">
          <p className="font-semibold">Ask a question about lobola traditions</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              {freeAnswersRemaining} free answer{freeAnswersRemaining !== 1 ? 's' : ''} remaining
            </Badge>
          </div>
        </div>
        
        <Textarea 
          placeholder="Ask Uncle Wisdom anything about lobola traditions..." 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading || freeAnswersRemaining <= 0}
          className="min-h-[100px]"
        />
        
        <Button 
          onClick={handleAskQuestion} 
          className="w-full"
          disabled={isLoading || !question.trim() || freeAnswersRemaining <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Asking Uncle Wisdom...
            </>
          ) : (
            'Ask Uncle Wisdom'
          )}
        </Button>
        
        {(askedQuestion || answer) && (
          <div className="mt-4 p-4 border rounded-lg space-y-4 bg-gray-50">
            {askedQuestion && (
              <div>
                <p className="font-semibold text-sm text-gray-600">Your Question:</p>
                <p className="text-gray-800">{askedQuestion}</p>
              </div>
            )}
            {answer && (
              <div>
                <p className="font-semibold text-sm text-gray-600 flex items-center gap-2">
                  <span role="img" aria-label="wise elder">👴🏿</span> Uncle Wisdom's Answer:
                </p>
                <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}