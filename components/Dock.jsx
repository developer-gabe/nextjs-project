import React from 'react';
import { useWindows } from '../lib/WindowContext';

const Dock = () => {
  const { windows, bringToFront, restoreWindow } = useWindows();

  const handleWindowClick = (windowId) => {
    const window = windows.find(w => w.id === windowId);
    console.log('Dock click - Window found:', window?.title, 'isMinimized:', window?.isMinimized);
    if (window && window.isMinimized) {
      console.log('Calling restoreWindow for:', window.title);
      restoreWindow(windowId);
    } else {
      console.log('Calling bringToFront for:', window?.title);
      bringToFront(windowId);
    }
  };

  const dockStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    padding: '12px 16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    zIndex: 9999
  };

  const dockItemStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    transition: 'all 0.2s ease',
    position: 'relative',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
  };

  const minimizedIndicator = {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#ff6b6b'
  };

  const activeIndicator = {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#51cf66'
  };

  if (windows.length === 0) {
    return null;
  }

  return (
    <div style={dockStyle}>
      {windows.map((window, index) => (
        <button
          key={window.id}
          style={{
            ...dockItemStyle,
            transform: window.isMinimized ? 'scale(0.9)' : 'scale(1)',
            opacity: window.isMinimized ? 0.6 : 1
          }}
          onClick={() => handleWindowClick(window.id)}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = window.isMinimized ? 'scale(0.9)' : 'scale(1)';
          }}
          title={window.title}
        >
          {window.title.charAt(0).toUpperCase()}
          
          {/* Indicator for window state */}
          {window.isMinimized ? (
            <div style={minimizedIndicator}></div>
          ) : window.zIndex === Math.max(...windows.map(w => w.zIndex)) ? (
            <div style={activeIndicator}></div>
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default Dock;