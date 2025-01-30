'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface AuthContextType {
  user: any
  isAuthReady: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, isAuthReady: false })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { user: initialUser } } = await supabase.auth.getUser()
        setUser(initialUser)
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsAuthReady(true)
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    initAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!isAuthReady) {
    return <LoadingSpinner />
  }

  return (
    <AuthContext.Provider value={{ user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
