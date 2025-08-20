import React, { useState, useRef } from 'react';
import { useWindows } from '../lib/WindowContext';
import BlogListWindow from './blog-list-window';
import LabsGrid from './LabsGrid';
import PhotoGrid from './photo-grid';
import Finder from './Finder';

const DesktopIcons = ({ allPostsData, onOpenPost, onOpenBio }) => {
  const { openWindow } = useWindows();
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [iconPositions, setIconPositions] = useState({
    'about-me': { x: 50, y: 50 },
    'blog-posts': { x: 50, y: 150 },
    'labs': { x: 50, y: 250 },
    'photography': { x: 50, y: 350 },
    'finder': { x: 50, y: 450 }
  });

  const handleOpenBlogList = () => {
    openWindow(<BlogListWindow allPostsData={allPostsData} onOpenPost={onOpenPost} />, "Blog Posts");
  };

  const handleOpenLabs = () => {
    const LabsWindow = () => (
      <div style={{ padding: '0', minHeight: '500px', minWidth: '700px' }}>
        <LabsGrid />
      </div>
    );
    openWindow(<LabsWindow />, "Labs & Experiments");
  };

  const handleOpenPhotography = () => {
    const PhotoWindow = () => (
      <div style={{ padding: '0', minHeight: '500px', minWidth: '700px' }}>
        <PhotoGrid />
      </div>
    );
    openWindow(<PhotoWindow />, "Photography");
  };

  const handleOpenFinder = () => {
    openWindow(<Finder />, "Finder");
  };

  const desktopApps = [
    {
      id: 'about-me',
      name: 'About Me',
      icon: '👨‍💻',
      onClick: onOpenBio
    },
    {
      id: 'blog-posts',
      name: 'Blog Posts',
      icon: '📝',
      onClick: handleOpenBlogList
    },
    {
      id: 'labs',
      name: 'Labs',
      icon: '🧪',
      onClick: handleOpenLabs
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '📸',
      onClick: handleOpenPhotography
    },
    {
      id: 'finder',
      name: 'Finder',
      icon: '📁',
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