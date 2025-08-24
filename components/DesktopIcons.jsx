import React, { useState, useRef } from 'react';
import { useWindows } from '../lib/WindowContext';
import BlogListWindow from './blog-list-window';
import Finder from './Finder';

const DesktopIcons = ({ allPostsData, onOpenPost, onOpenBio }) => {
  const { openWindow } = useWindows();
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [iconPositions, setIconPositions] = useState({
    'about-me': { x: 1200, y: 50 },
    'blog-posts': { x: 1200, y: 150 },
    'applications': { x: 1200, y: 250 },
    'pictures': { x: 1200, y: 350 },
    'finder': { x: 1200, y: 450 }
  });

  const handleOpenBlogList = () => {
    openWindow(<BlogListWindow allPostsData={allPostsData} onOpenPost={onOpenPost} />, "Blog Posts");
  };

  const handleOpenLabs = () => {
    openWindow(<Finder initialPath="/Applications" />, "Applications");
  };

  const handleOpenPhotography = () => {
    openWindow(<Finder initialPath="/Pictures" />, "Pictures");
  };

  const handleOpenFinder = () => {
    openWindow(<Finder />, "Finder");
  };

  const desktopApps = [
    {
      id: 'about-me',
      name: 'About Me',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      onClick: onOpenBio
    },
    {
      id: 'blog-posts',
      name: 'Blog Posts',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      onClick: handleOpenBlogList
    },
    {
      id: 'applications',
      name: 'Applications',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="6" height="6" rx="2"></rect>
          <rect x="15" y="3" width="6" height="6" rx="2"></rect>
          <rect x="3" y="15" width="6" height="6" rx="2"></rect>
          <rect x="15" y="15" width="6" height="6" rx="2"></rect>
        </svg>
      ),
      onClick: handleOpenLabs
    },
    {
      id: 'pictures',
      name: 'Pictures',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21,15 16,10 5,21"></polyline>
        </svg>
      ),
      onClick: handleOpenPhotography
    },
    {
      id: 'finder',
      name: 'Finder',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      onClick: handleOpenFinder
    }
  ];

  const handleMouseDown = (e, iconId) => {
    e.preventDefault();
    setDraggedIcon(iconId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const initialPos = iconPositions[iconId];

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setIconPositions(prev => ({
        ...prev,
        [iconId]: {
          x: Math.max(0, initialPos.x + deltaX),
          y: Math.max(0, initialPos.y + deltaY)
        }
      }));
    };

    const handleMouseUp = () => {
      setDraggedIcon(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (app) => {
    app.onClick();
  };

  return (
    <div className="desktop-icons">
      {desktopApps.map((app) => (
        <div
          key={app.id}
          className="desktop-icon"
          style={{
            left: iconPositions[app.id].x,
            top: iconPositions[app.id].y,
            cursor: draggedIcon === app.id ? 'grabbing' : 'grab',
            opacity: draggedIcon === app.id ? 0.8 : 1
          }}
          onMouseDown={(e) => handleMouseDown(e, app.id)}
          onDoubleClick={() => handleDoubleClick(app)}
        >
          <div className="desktop-icon-image">
            {app.icon}
          </div>
          <div className="desktop-icon-label">
            {app.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;