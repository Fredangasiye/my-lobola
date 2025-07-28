import { useMutation } from '@tanstack/react-query';
import { useSession } from '@supabase/auth-helpers-react';
import { Link, useLocation } from "wouter";
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';

const SMALL_COW_PLAN_CODE = 'PLN_...your_small_cow_plan_code_here';
const BIG_BULL_PLAN_CODE = 'PLN_...your_big_bull_plan_code_here';

const tiers = [
    { name: 'Free', price: 'R0', questions: '1 Question', features: ['Lobola Calculator'], buttonText: 'Return Home', isFree: true },
    { name: 'Small Cow', price: 'R35', planCode: SMALL_COW_PLAN_CODE, questions: '50 Questions/month', features: ['Lobola Calculator', 'AI Uncle Wisdom'], buttonText: 'Choose Small Cow' },
    { name: 'Big Bull', price: 'R90', planCode: BIG_BULL_PLAN_CODE, questions: '200 Questions/month', features: ['Lobola Calculator', 'AI Uncle Wisdom', 'Priority Support'], buttonText: 'Choose Big Bull' },
];

export default function PricingPage() {
  const session = useSession();
  const [, navigate] = useLocation();

  const checkoutMutation = useMutation({
    mutationFn: (planCode: string) => fetch('/api/create-checkout-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planCode }),
    }).then(res => res.json()),
    onSuccess: (data) => {
        if (data.url) { window.location.href = data.url; }
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </button>
        {/* ... persuasive text ... */}
        <div className="grid md:grid-cols-3 gap-8">
            {tiers.map(tier => (
                <div key={tier.name} className={`border rounded-lg p-6 flex flex-col`}>
                    <h2 className="text-2xl font-semibold">{tier.name}</h2>
                    <p className="text-3xl font-bold mt-2">{tier.price}<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-2 mt-6 mb-8 flex-grow">
                        {tier.features.map(feature => ( <li key={feature} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {feature}</li> ))}
                    </ul>
                    {tier.isFree ? (
                        <Link href="/"><Button variant="outline" className="w-full">Return Home</Button></Link>
                    ) : (
                        <Button 
                          onClick={() => {
                            if (!session) { navigate('/auth'); return; }
                            checkoutMutation.mutate(tier.planCode!);
                          }} 
                          disabled={checkoutMutation.isPending} 
                          className="w-full"
                        >
                            {checkoutMutation.isPending ? 'Redirecting...' : tier.buttonText}
                        </Button>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}