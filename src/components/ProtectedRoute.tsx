'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthReady && !user) {
      console.log('[ProtectedRoute] No user found, redirecting to signin')
      router.push('/auth/signin')
    }
  }, [user, isAuthReady, router])

  if (!isAuthReady) {
    console.log('[ProtectedRoute] Auth not ready, showing loading spinner')
    return <LoadingSpinner />
  }

  if (!user) {
    console.log('[ProtectedRoute] No user, returning null while redirecting')
    return null
  }

  console.log('[ProtectedRoute] User authenticated, rendering protected content')
  return children
}
