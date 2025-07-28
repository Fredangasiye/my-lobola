import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthPage() {
  const supabaseClient = useSupabaseClient()
  return (
    <div className="max-w-md mx-auto py-12">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo="/"
      />
    </div>
  )
}