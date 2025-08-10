import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Router, Route, Switch } from 'wouter'
import AppLayout from './pages/app-layout'
import AuthPage from './pages/AuthPage'
import AuthCallback from './pages/auth-callback'
import NotFound from './pages/not-found'
import PricingPage from './pages/pricing'
import { queryClient } from './lib/queryClient'
import { ErrorBoundary } from './components/ErrorBoundary'

// Create contexts for Supabase
const SupabaseContext = createContext<SupabaseClient | null>(null)
const SessionContext = createContext<Session | null>(null)

// Context providers
export const useSupabaseClient = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabaseClient must be used within SupabaseProvider')
  }
  return context
}

export const useSession = () => {
  return useContext(SessionContext)
}

function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => {
    const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
    const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    return createClient(supabaseUrl, supabaseAnonKey)
  })

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabaseClient])

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      <SessionContext.Provider value={session}>
        {children}
      </SessionContext.Provider>
    </SupabaseContext.Provider>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/" component={AppLayout} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App