import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./pages/app-layout";
import AuthPage from "./pages/AuthPage"; // The new, unified auth page
import NotFound from "./pages/not-found";
import PricingPage from "./pages/pricing";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={AppLayout} />
        <Route path="/pricing" component={PricingPage} />
        {/* 
          THIS IS THE FIX: A single, smart route for authentication.
          This replaces the old sign-in and sign-up routes.
        */}
        <Route path="/auth" component={AuthPage} />
        
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;