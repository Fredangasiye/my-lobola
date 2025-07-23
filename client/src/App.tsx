// client/src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/app-layout";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
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
          THIS IS THE FIX:
          The /:rest* is a "wildcard" that catches all sub-pages,
          like /sign-in/sso-callback, and sends them to the correct component.
          This will fix the 404 errors permanently.
        */}
        <Route path="/sign-in/:rest*" component={SignInPage} />
        <Route path="/sign-up/:rest*" component={SignUpPage} />
        
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;