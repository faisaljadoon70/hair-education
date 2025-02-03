'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabase-client'
import LoadingSpinner from '@/components/LoadingSpinner'

interface AuthState {
  user: any;
  isAuthReady: boolean;
  isLoading: boolean;
  loadingMessage: string;
  lastKnownRoute?: string;
}

const loadingMessages = {
  init: "Initializing...",
  auth: "Verifying your credentials...",
  setup: "Setting up your workspace...",
  complete: "Almost there..."
}

interface AuthContextType {
  user: any;
  isAuthReady: boolean;
  isLoading: boolean;
  loadingMessage: string;
  lastKnownRoute?: string;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthReady: false,
  isLoading: false,
  loadingMessage: '',
  lastKnownRoute: undefined,
  refreshSession: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthReady: false,
    isLoading: true,
    loadingMessage: loadingMessages.init
  })
  const router = useRouter()
  const pathname = usePathname()

  const refreshSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setAuthState(prev => ({
          ...prev,
          user: session.user,
          isAuthReady: true,
          isLoading: false,
          loadingMessage: ''
        }))
        // Force a router refresh to update client-side state
        router.refresh()
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
    }
  }

  useEffect(() => {
    let mounted = true
    
    const initAuth = async () => {
      try {
        setAuthState(prev => ({ ...prev, loadingMessage: loadingMessages.auth }))
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user && mounted) {
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            isAuthReady: true,
            isLoading: false,
            loadingMessage: ''
          }))
          // Force router refresh on initial auth
          router.refresh()
        } else if (mounted) {
          setAuthState(prev => ({
            ...prev,
            isAuthReady: true,
            isLoading: false,
            loadingMessage: ''
          }))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setAuthState(prev => ({
            ...prev,
            isAuthReady: true,
            isLoading: false,
            loadingMessage: ''
          }))
        }
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event)
      
      if (!mounted) return

      if (event === 'SIGNED_IN') {
        setAuthState(prev => ({
          ...prev,
          user: session?.user ?? null,
          isAuthReady: true,
          isLoading: false,
          loadingMessage: '',
          lastKnownRoute: pathname
        }))
        // Force router refresh on sign in
        router.refresh()
        
        // If we have a lastKnownRoute, navigate there
        if (authState.lastKnownRoute) {
          router.push(authState.lastKnownRoute)
        }
      } else if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          isAuthReady: true,
          isLoading: false,
          loadingMessage: ''
        })
        router.push('/auth/signin')
        router.refresh()
      }
    })

    initAuth()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [pathname, router])

  const contextValue = {
    ...authState,
    refreshSession
  }

  if (!authState.isAuthReady || authState.isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-center">
          <LoadingSpinner />
          {authState.loadingMessage && (
            <p className="mt-4 text-gray-600 animate-fade-in">
              {authState.loadingMessage}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
