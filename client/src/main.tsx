import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global error handler for React.Children.only and other errors
window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('React.Children.only')) {
    console.warn('React.Children.only error caught, reloading page...');
    window.location.reload();
    return;
  }
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// This is the simplest possible entry point.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)