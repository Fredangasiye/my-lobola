import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '../App'

export default function AuthPage() {
  const supabaseClient = useSupabaseClient()
  
  return (
    <div className="max-w-md mx-auto py-12">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo={`${window.location.origin}/auth/callback`}
        showLinks={true}
        view="sign_in"
      />
    </div>
  )
}