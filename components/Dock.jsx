import React from 'react';
import { useWindows } from '../lib/WindowContext';
import Bio from './bio';
import BlogListWindow from './blog-list-window';
import Finder from './Finder';
import styles from '../styles/Dock.module.css';

const Dock = ({ allPostsData = [], onOpenPost }) => {
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
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      onClick: () => openWindow(<Finder />, "Finder")
    },
    {
      id: 'about-me',
      name: 'About Me',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      onClick: () => openWindow(<Bio />, "About Me")
    },
    {
      id: 'blog-posts',
      name: 'Blog Posts',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      onClick: () => {
        if (allPostsData && allPostsData.length > 0 && onOpenPost) {
          openWindow(<BlogListWindow allPostsData={allPostsData} onOpenPost={onOpenPost} />, "Blog Posts");
        } else {
          // Fallback for when blog data isn't available
          const SimpleBlogList = () => (
            <div style={{ padding: '20px', fontFamily: 'var(--font-family-system)' }}>
              <h2>Blog Posts</h2>
              <p>Visit the home page or Posts section to view all blog posts.</p>
            </div>
          );
          openWindow(<SimpleBlogList />, "Blog Posts");
        }
      }
    },
    {
      id: 'applications',
      name: 'Applications',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="6" height="6" rx="2"></rect>
          <rect x="15" y="3" width="6" height="6" rx="2"></rect>
          <rect x="3" y="15" width="6" height="6" rx="2"></rect>
          <rect x="15" y="15" width="6" height="6" rx="2"></rect>
        </svg>
      ),
      onClick: () => openWindow(<Finder initialPath="/Applications" />, "Applications")
    },
    {
      id: 'pictures',
      name: 'Pictures',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21,15 16,10 5,21"></polyline>
        </svg>
      ),
      onClick: () => openWindow(<Finder initialPath="/Pictures" />, "Pictures")
    }
  ];

  return (
    <div className={styles.dock}>
      {/* Static dock applications */}
      {dockApps.map((app) => (
        <button
          key={app.id}
          className={styles.dockItem}
          onClick={app.onClick}
          title={app.name}
        >
          <div className={styles.dockIcon}>
            {app.icon}
          </div>
        </button>
      ))}

      {/* Separator if there are open windows */}
      {windows.length > 0 && (
        <div className={styles.separator} />
      )}

      {/* Open windows */}
      {windows.map((window, index) => (
        <button
          key={window.id}
          className={`${styles.windowItem} ${window.isMinimized ? styles.windowItemMinimized : ''}`}
          onClick={() => handleWindowClick(window.id)}
          title={window.title}
        >
          {window.title.charAt(0).toUpperCase()}
          
          {/* Indicator for window state */}
          {window.isMinimized ? (
            <div className={styles.minimizedIndicator}></div>
          ) : window.zIndex === Math.max(...windows.map(w => w.zIndex)) ? (
            <div className={styles.activeIndicator}></div>
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default Dock;