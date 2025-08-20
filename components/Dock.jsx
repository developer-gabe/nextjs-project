import React from 'react';
import { useWindows } from '../lib/WindowContext';
import Bio from './bio';
import LabsGrid from './LabsGrid';
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
      id: 'labs',
      name: 'Labs',
      icon: '🧪',
      onClick: () => {
        const LabsWindow = () => (
          <div style={{ padding: '0', minHeight: '500px', minWidth: '700px' }}>
            <LabsGrid />
          </div>
        );
        openWindow(<LabsWindow />, "Labs & Experiments");
      }
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '📸',
      onClick: () => {
        const PhotoWindow = () => (
          <div style={{ padding: '0', minHeight: '500px', minWidth: '700px' }}>
            <PhotoGrid />
          </div>
        );
        openWindow(<PhotoWindow />, "Photography");
      }
    }
  ];

  const dockStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '4px',
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '8px 12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    zIndex: 9999
  };

  const dockItemStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'relative',
    border: 'none',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))',
    color: '#333',
    fontWeight: 'normal',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
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
            e.target.style.transform = 'scale(1.2) translateY(-8px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
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
          height: '48px',
          background: 'rgba(255, 255, 255, 0.4)',
          margin: '4px 6px',
          alignSelf: 'center'
        }} />
      )}

      {/* Open windows */}
      {windows.map((window, index) => (
        <button
          key={window.id}
          style={{
            ...dockItemStyle,
            transform: window.isMinimized ? 'scale(0.85)' : 'scale(1)',
            opacity: window.isMinimized ? 0.7 : 1,
            background: window.isMinimized 
              ? 'linear-gradient(145deg, rgba(200, 200, 200, 0.8), rgba(180, 180, 180, 0.7))'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))'
          }}
          onClick={() => handleWindowClick(window.id)}
          onMouseEnter={(e) => {
            const baseScale = window.isMinimized ? 0.85 : 1;
            e.target.style.transform = `scale(${baseScale * 1.15}) translateY(-6px)`;
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            const baseScale = window.isMinimized ? 0.85 : 1;
            e.target.style.transform = `scale(${baseScale}) translateY(0)`;
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
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