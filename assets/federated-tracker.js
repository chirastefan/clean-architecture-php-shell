import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Simulated Module Federation Remote Entry Point.
 * Instead of registering a Web Component, this exports an imperative `mount` function.
 */
export function mount(containerElement, props = {}) {
  if (!containerElement) {
    console.error('Target container element not found for mounting federated tracker!');
    return;
  }

  const root = createRoot(containerElement);
  
  // Render a simple React component directly into the provided DOM container
  const element = React.createElement(
    'div',
    { 
      style: { 
        padding: '1.5rem', 
        border: '2px dashed #4F46E5', 
        borderRadius: '8px',
        backgroundColor: props.theme === 'dark' ? '#1E1B4B' : '#EEF2FF',
        color: props.theme === 'dark' ? '#EEF2FF' : '#1E1B4B',
        fontFamily: 'system-ui, sans-serif'
      } 
    },
    [
      React.createElement('h3', { key: 'title', style: { marginTop: 0 } }, '⚡ Simulated Module Federation Remote'),
      React.createElement('p', { key: 'user' }, `Mounted for User ID: ${props.userId || 'Guest'}`),
      React.createElement('p', { key: 'status' }, `Theme Mode: ${props.theme || 'light'}`),
      React.createElement(
        'button', 
        { 
          key: 'btn', 
          style: {
            padding: '8px 16px',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          },
          onClick: () => {
            if (typeof props.onAction === 'function') {
              props.onAction('Federated button clicked!');
            } else {
              alert('Federated React component state updated!');
            }
          }
        }, 
        'Trigger Action'
      )
    ]
  );

  root.render(element);

  // Return unmount cleanup function
  return () => {
    root.unmount();
  };
}
