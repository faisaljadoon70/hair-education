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
    let isMounted = true // Track if the component is still mounted

    const initAuth = async () => {
      console.log('[AuthContext] Starting auth initialization...')
      try {
        // Initial session check
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[AuthContext] Initial session check:', session ? 'Session exists' : 'No session')
        
        if (session?.user && isMounted) {
          console.log('[AuthContext] Setting user from session')
          setUser(session.user)
        } else {
          // Fallback to direct user check
          const { data: { user: initialUser } } = await supabase.auth.getUser()
          console.log('[AuthContext] User check result:', initialUser ? 'User found' : 'No user')
          if (initialUser && isMounted) {
            setUser(initialUser)
          }
        }
      } catch (error) {
        console.error('[AuthContext] Error during auth initialization:', error)
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthContext] Auth state changed:', event, session ? 'Session exists' : 'No session')
      if (isMounted) {
        setUser(session?.user ?? null)
        setIsAuthReady(true) // Mark auth as ready after state change
      }
    })

    // Initialize auth and wait for the first state change
    initAuth()

    // Cleanup
    return () => {
      console.log('[AuthContext] Cleaning up auth subscriptions')
      isMounted = false
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
