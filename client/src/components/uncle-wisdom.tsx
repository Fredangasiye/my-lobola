import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, SignedOut, SignInButton, SignedIn } from "@clerk/clerk-react";
import { Lightbulb, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Link } from "wouter";

// This function fetches the user's subscription status from our secure API
const fetchUserStatus = async () => {
  // THE FIX: Add credentials: 'include' to send the user's "security pass"
  const response = await fetch('/api/user/status', { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function UncleWisdom() {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [hasUsedFreeQuestion, setHasUsedFreeQuestion] = useState(false);

  const { data: userStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['userStatus', user?.id],
    queryFn: fetchUserStatus,
    enabled: !!isSignedIn,
  });
  
  const aiMutation = useMutation({
    mutationFn: (newQuestion: string) => fetch('/api/ask-uncle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: newQuestion }),
      credentials: 'include', // <-- THE FIX
    }).then(res => res.json()),
    onSuccess: (data) => {
        setAnswer(data.answer);
        if (!userStatus?.isSubscribed) {
          localStorage.setItem(`freeQuestionUsed_${user?.id}`, 'true');
          setHasUsedFreeQuestion(true);
        }
    },
    onError: () => {
        setAnswer("My apologies, I could not hear your question clearly. Please try again.");
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: () => fetch('/api/subscribe', { 
        method: 'POST',
        credentials: 'include' // <-- THE FIX
    }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userStatus', user?.id] });
    },
  });

  useEffect(() => {
    if (isSignedIn && user) {
      const freebieUsed = localStorage.getItem(`freeQuestionUsed_${user.id}`);
      setHasUsedFreeQuestion(freebieUsed === 'true');
    } else {
      setHasUsedFreeQuestion(false);
    }
  }, [isSignedIn, user]);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    setAskedQuestion(question);
    setQuestion("");
    aiMutation.mutate(question);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span>
          Ask Uncle Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignedOut>
          <div className="text-center p-4 border rounded-lg bg-secondary">
            <p className="font-semibold">Want to ask a question?</p>
            <p className="text-sm text-muted-foreground mt-1">Please sign in to get your one free question.</p>
            <SignInButton mode="modal">
              <Button className="mt-4">Sign In</Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          {isLoadingStatus ? (
            <p className="text-center text-muted-foreground">Loading your status...</p>
          ) : userStatus?.isSubscribed ? (
            <>
              <p className="text-sm text-center text-green-600 font-semibold flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> You have unlimited questions!</p>
              <Textarea placeholder="Ask Uncle Wisdom anything about lobola..." value={question} onChange={(e) => setQuestion(e.target.value)} disabled={aiMutation.isPending} />
              <Button onClick={handleAskQuestion} disabled={aiMutation.isPending} className="w-full">
                {aiMutation.isPending ? "Thinking..." : "Ask Uncle Wisdom"}
              </Button>
            </>
          ) : hasUsedFreeQuestion ? (
            <div className="text-center p-4 border rounded-lg bg-secondary">
              <p className="font-semibold">You have used your free question.</p>
              <p className="text-sm text-muted-foreground mt-1">Subscribe to get unlimited answers and full access.</p>
              <Link href="/pricing">
                <Button className="mt-4">
                  Ask More Questions
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Textarea placeholder="Ask your one free question about lobola traditions..." value={question} onChange={(e) => setQuestion(e.target.value)} disabled={aiMutation.isPending}/>
              <Button onClick={handleAskQuestion} disabled={aiMutation.isPending} className="w-full">
                {aiMutation.isPending ? "Thinking..." : "Ask Your Free Question"}
              </Button>
            </>
          )}
        </SignedIn>
        
        {(askedQuestion || answer) && (
          <div className="mt-4 p-4 border rounded-lg space-y-4">
            {askedQuestion && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-muted-foreground italic">You asked: "{askedQuestion}"</p>
              </div>
            )}
            {answer && (
              <div className="whitespace-pre-wrap">
                <p>{answer}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}