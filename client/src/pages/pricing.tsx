import { useMutation } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { Link, useLocation } from "wouter";
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';

// IMPORTANT: Make sure you have replaced these with your real Plan Codes
const SMALL_COW_PLAN_CODE = 'PLN_...your_small_cow_plan_code_here';
const BIG_BULL_PLAN_CODE = 'PLN_...your_big_bull_plan_code_here';

const tiers = [
    { name: 'Free', price: 'R0', questions: '1 Question', features: ['Lobola Calculator'], buttonText: 'Return Home', isFree: true },
    { name: 'Small Cow', price: 'R35', planCode: SMALL_COW_PLAN_CODE, questions: '50 Questions/month', features: ['Lobola Calculator', 'AI Uncle Wisdom'], buttonText: 'Choose Small Cow' },
    { name: 'Big Bull', price: 'R90', planCode: BIG_BULL_PLAN_CODE, questions: '200 Questions/month', features: ['Lobola Calculator', 'AI Uncle Wisdom', 'Priority Support'], buttonText: 'Choose Big Bull' },
];

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const [, navigate] = useLocation();

  const checkoutMutation = useMutation({
    mutationFn: (planCode: string) => fetch('/api/create-checkout-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planCode }),
        credentials: 'include',
    }).then(res => res.json()),
    onSuccess: (data) => {
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Could not start payment. Please try again.');
        }
    },
    onError: () => {
      alert('An error occurred. Please try again.');
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculator
        </button>

        <h1 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h1>

        <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-lg text-muted-foreground">
              Lobola is more than a calculation, it's a life-changing conversation.
            </p>
            <p className="mt-2 font-semibold text-foreground">
              Don't enter this sacred negotiation unprepared.
            </p>
            <p className="mt-2 text-red-600 font-semibold">
              A misstep could lead to misunderstanding, disrespect, or family conflict.
            </p>
        </div>

        <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
                {tiers.map(tier => (
                    <div key={tier.name} className={`border rounded-lg p-6 flex flex-col ${tier.name === 'Big Bull' ? 'border-primary shadow-lg' : ''}`}>
                        <h2 className="text-2xl font-semibold">{tier.name}</h2>
                        <p className="text-3xl font-bold mt-2">{tier.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                        <p className="text-muted-foreground mt-1">{tier.questions}</p>
                        <ul className="space-y-2 mt-6 mb-8 flex-grow">
                            {tier.features.map(feature => ( <li key={feature} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {feature}</li> ))}
                        </ul>
                        {tier.isFree ? (
                            <Link href="/"><Button variant="outline" className="w-full">Return Home</Button></Link>
                        ) : (
                            <Button 
                              onClick={() => {
                                if (!isSignedIn) {
                                  navigate('/sign-in');
                                  return;
                                }
                                checkoutMutation.mutate(tier.planCode!)
                              }} 
                              disabled={checkoutMutation.isPending} 
                              className="w-full"
                              variant={tier.name === 'Big Bull' ? 'default' : 'outline'}
                            >
                                {checkoutMutation.isPending ? 'Redirecting...' : tier.buttonText}
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
        
    </div> // This was the main closing div that was likely mismatched
  );
}