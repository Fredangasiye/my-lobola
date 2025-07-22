// client/src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/app-layout";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import NotFound from "./pages/not-found";
import PricingPage from "./pages/pricing"; // <-- ADD THIS IMPORT

// Create the client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={AppLayout} />
        
        {/* THIS IS THE NEW ROUTE FOR YOUR PRICING PAGE */}
        <Route path="/pricing" component={PricingPage} />
        
        <Route path="/sign-in/:rest*" component={SignInPage} />
        <Route path="/sign-up/:rest*" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;