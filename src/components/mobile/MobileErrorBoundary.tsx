'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class MobileErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Mobile component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white p-4">
          <h1 className="text-xl font-semibold text-red-500 mb-2">Something went wrong</h1>
          <p className="text-gray-600">The mobile version is currently unavailable. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MobileErrorBoundary;
