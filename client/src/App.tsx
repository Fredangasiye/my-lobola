import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Router, Route, Switch } from 'wouter'
import AppLayout from './pages/app-layout'
import AuthPage from './pages/AuthPage'
import NotFound from './pages/not-found'
import PricingPage from './pages/pricing'

function App() {
  const [supabaseClient] = useState(() => {
    const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
    const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    return createClient(supabaseUrl, supabaseAnonKey)
  })

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Router>
        <Switch>
          <Route path="/" component={AppLayout} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </SessionContextProvider>
  )
}

export default App