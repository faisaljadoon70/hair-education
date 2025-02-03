'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class DeviceErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Device Feature Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800">
            This feature is not available on your device
          </h3>
          <p className="mt-2 text-sm text-yellow-700">
            Please try accessing this content on another device or contact support if you believe this is an error.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
