import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Specifically handle React.Children.only errors
    if (error.message.includes('React.Children.only')) {
      console.warn('React.Children.only error caught, attempting recovery...');
      // Try to recover by forcing a re-render
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Auto-recover from React.Children.only errors
    if (error.message.includes('React.Children.only')) {
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          We're experiencing a technical issue. Please refresh the page to try again.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800"
        >
          Refresh Page
        </button>
        {error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">Technical Details</summary>
            <pre className="mt-2 text-xs text-gray-400 overflow-auto">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  );
}