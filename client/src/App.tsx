import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// We MUST import the pages we are using!
import Calculator from "./pages/calculator";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Calculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <main>
          {/* The main router that shows your pages */}
          <Router />
        </main>
      </div>
      
      {/* 
        We will leave the Toaster and TooltipProvider disabled for now.
        We can add them back later once the main page is working.
      */}
    </QueryClientProvider>
  );
}

export default App; // It's good practice to add this line