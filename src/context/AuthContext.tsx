'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase-client'
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
    let mounted = true

    const initAuth = async () => {
      console.log('[AuthContext] Starting auth initialization...')
      try {
        // First try to get the session
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[AuthContext] Initial session check:', session ? 'Session exists' : 'No session')
        
        if (mounted) {
          if (session?.user) {
            console.log('[AuthContext] Setting initial user from session')
            setUser(session.user)
          } else {
            // If no session, try to get user directly
            const { data: { user: initialUser } } = await supabase.auth.getUser()
            console.log('[AuthContext] User check result:', initialUser ? 'User found' : 'No user')
            if (mounted) {
              setUser(initialUser)
            }
          }
        }
      } catch (error) {
        console.error('[AuthContext] Error initializing auth:', error)
      } finally {
        if (mounted) {
          console.log('[AuthContext] Auth initialization complete')
          setIsAuthReady(true)
        }
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event, session ? 'Session exists' : 'No session')
      if (mounted) {
        setUser(session?.user ?? null)
        // Ensure isAuthReady is true after any auth state change
        setIsAuthReady(true)
      }
    })

    initAuth()

    return () => {
      console.log('[AuthContext] Cleaning up auth subscriptions')
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (!isAuthReady) {
    console.log('[AuthContext] Still initializing, showing loading spinner')
    return <LoadingSpinner />
  }

  return (
    <AuthContext.Provider value={{ user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
