'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/context/AuthContext'

export default function AuthButton() {
  const router = useRouter()
  const { user, isAuthReady } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/auth/signin')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  if (!isAuthReady) return null

  return (
    <div className="flex items-center gap-4">
      {user && (
        <span className="text-sm text-gray-700">
          Signed in as {user.email}
        </span>
      )}
      <button
        onClick={user ? handleSignOut : handleSignIn}
        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
      >
        {user ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  )
}
