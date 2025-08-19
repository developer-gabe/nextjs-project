import React from 'react';
import { useWindows } from '../lib/WindowContext';
import Bio from './bio';
import PortfolioGrid from './portfolio-grid';
import PhotoGrid from './photo-grid';
import Finder from './Finder';

const Dock = () => {
  const { windows, bringToFront, restoreWindow, openWindow } = useWindows();

  const handleWindowClick = (windowId) => {
    const window = windows.find(w => w.id === windowId);
    if (window && window.isMinimized) {
      restoreWindow(windowId);
    } else {
      bringToFront(windowId);
    }
  };

  // Static dock applications
  const dockApps = [
    {
      id: 'finder',
      name: 'Finder',
      icon: '📁',
      onClick: () => openWindow(<Finder />, "Finder")
    },
    {
      id: 'about-me',
      name: 'About Me',
      icon: '👨‍💻',
      onClick: () => openWindow(<Bio />, "About Me")
    },
    {
      id: 'blog-posts',
      name: 'Blog Posts',
      icon: '📝',
      onClick: () => {
        // Create a simple blog posts component for the dock
        const SimpleBlogList = () => (
          <div style={{ padding: '20px' }}>
            <h2>Blog Posts</h2>
            <p>Click on the desktop Blog Posts icon to see all posts, or navigate to the Posts page to view them.</p>
          </div>
        );
        openWindow(<SimpleBlogList />, "Blog Posts");
      }
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '💼',
      onClick: () => openWindow(<PortfolioGrid />, "Portfolio")
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '📸',
      onClick: () => openWindow(<PhotoGrid />, "Photography")
    }
  ];

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

  return (
    <div style={dockStyle}>
      {/* Static dock applications */}
      {dockApps.map((app) => (
        <button
          key={app.id}
          style={dockItemStyle}
          onClick={app.onClick}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
          title={app.name}
        >
          {app.icon}
        </button>
      ))}

      {/* Separator if there are open windows */}
      {windows.length > 0 && (
        <div style={{
          width: '1px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.3)',
          margin: '4px 8px'
        }} />
      )}

      {/* Open windows */}
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