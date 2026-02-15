"use client"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const loginWithGoogle = async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000"
      }
    })

  }

  return (
    <div className="flex items-center justify-center h-screen">

      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Login with Google
      </button>

    </div>
  )
}


