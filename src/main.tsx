
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more efficient rendering approach
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

// Add this to defer non-critical operations
const startApp = () => {
  root.render(<App />);
};

// Check if the browser is idle or if the document is fully loaded
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback for modern browsers
  window.requestIdleCallback(startApp, { timeout: 1000 });
} else if (document.readyState === 'complete') {
  // Document already loaded
  startApp();
} else {
  // Fix the type error by using correct event listener typing
  document.addEventListener('DOMContentLoaded', startApp);
}
