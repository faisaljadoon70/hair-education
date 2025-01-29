'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/auth/signin')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  return (
    <div className="flex items-center gap-4">
      {user && (
        <span className="text-sm text-gray-700">
          Signed in as {user.email}
        </span>
      )}
      <button
        onClick={user ? handleSignOut : handleSignIn}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {user ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  )
}
