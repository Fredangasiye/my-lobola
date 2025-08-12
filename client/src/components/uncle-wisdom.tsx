import { useState } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

const fetchUserStatus = async () => { /* ... your fetch user status logic ... */ };

export default function UncleWisdom() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setAskedQuestion(question);
    setAnswer("Thank you for your question! In demo mode, Uncle Wisdom is here to remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This tool is meant to start conversations, not replace them.");
    setQuestion("");
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
          <p className="font-semibold">Demo Mode - Uncle Wisdom</p>
          <p className="text-sm text-gray-600 mt-2">Ask a question about lobola traditions</p>
        </div>
        <Textarea 
          placeholder="Ask Uncle Wisdom anything about lobola traditions..." 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
        />
        <Button onClick={handleAskQuestion} className="w-full">Ask Uncle Wisdom</Button>
        
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
                  <span role="img" aria-label="wise elder">👴🏿</span> Uncle Wisdom's Answer:
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