import { Switch, Route } from "wouter";
import AppLayout from "./pages/app-layout";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import NotFound from "./pages/not-found";
import PricingPage from "./pages/pricing";

function App() {
  return (
    <Switch>
      <Route path="/" component={AppLayout} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/sign-in/:rest*" component={SignInPage} />
      <Route path="/sign-up/:rest*" component={SignUpPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;