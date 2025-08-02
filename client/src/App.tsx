import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Router, Route, Switch } from 'wouter'
import AppLayout from './pages/app-layout'
import AuthPage from './pages/AuthPage'
import AuthCallback from './pages/auth-callback'
import NotFound from './pages/not-found'
import PricingPage from './pages/pricing'
import { queryClient } from './lib/queryClient'

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
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <Router>
          <Switch>
            <Route path="/" component={AppLayout} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/auth/callback" component={AuthCallback} />
            <Route path="/pricing" component={PricingPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}

export default App