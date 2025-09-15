import React from 'react';

interface SafeComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function SafeComponent({ children, fallback = null }: SafeComponentProps) {
  try {
    // Ensure we always have a single child for components that need it
    if (React.Children.count(children) === 0) {
      return <>{fallback}</>;
    }
    
    if (React.Children.count(children) === 1) {
      return <>{children}</>;
    }
    
    // Wrap multiple children in a span
    return <span>{children}</span>;
  } catch (error) {
    console.warn('SafeComponent error:', error);
    return <>{fallback}</>;
  }
}

export function withSafeChildren<T extends {}>(Component: React.ComponentType<T>) {
  return React.forwardRef<any, T & { children?: React.ReactNode }>((props, ref) => {
    const { children, ...otherProps } = props;
    
    return (
      <Component {...(otherProps as T)} ref={ref}>
        <SafeComponent>{children}</SafeComponent>
      </Component>
    );
  });
}