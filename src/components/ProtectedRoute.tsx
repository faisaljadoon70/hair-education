'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner size="large" color="text-pink-600" />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
