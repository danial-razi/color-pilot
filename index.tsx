
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ensure the app can work offline and refresh when an update is available.
registerSW({
  immediate: true,
  onNeedRefresh() {
    // Trigger a full reload when a new service worker is ready.
    window.location.reload();
  },
});
