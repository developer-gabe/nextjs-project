import React, { useEffect, useRef, useState } from 'react';
import { useWindows } from '../lib/WindowContext';
import styles from '../styles/Window.module.css';

const Window = ({ id, title, children, onClose, position, zIndex, isActive, isMinimized, headerColor, size }) => {
  const { bringToFront, updatePosition, minimizeWindow } = useWindows();
  const windowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({ 
    width: size?.width || 800, 
    height: size?.height || 600 
  });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [currentSize, setCurrentSize] = useState({ 
    width: size?.width || 800, 
    height: size?.height || 600 
  });

	const windowClass = `${styles.windowContainer} ${isActive ? styles.active : styles.inactive} ${isResizing ? styles.resizing : ''} ${isMaximized ? styles.maximized : ''}`;

  useEffect(() => {
    const element = windowRef.current;
    if (element) {
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.style.zIndex = zIndex;
    }
  }, [position, zIndex]);

  // Handle title bar dragging
  const handleTitleBarMouseDown = (e) => {
    // Don't start dragging if we're already resizing or if clicking on buttons
    if (isResizing || e.target.tagName === 'BUTTON') return;
    
    e.preventDefault();
    const element = windowRef.current;
    let posInitialX = e.clientX;
    let posInitialY = e.clientY;

    const dragElement = (e) => {
      e.preventDefault();
      const posX = posInitialX - e.clientX;
      const posY = posInitialY - e.clientY;
      posInitialX = e.clientX;
      posInitialY = e.clientY;

      element.style.top = (element.offsetTop - posY) + "px";
      element.style.left = (element.offsetLeft - posX) + "px";
    };

    const closeDragElement = () => {
      document.removeEventListener('mousemove', dragElement);
      document.removeEventListener('mouseup', closeDragElement);
      // Update the position in the context
      updatePosition(id, { x: element.offsetLeft, y: element.offsetTop });
    };

    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', dragElement);
  };

  const handleClick = () => {
    bringToFront(id);
  };

  const handleMinimize = () => {
    console.log('Window minimize button clicked, window id:', id, 'title:', title);
    minimizeWindow(id);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      // Store current size and position before maximizing
      setOriginalSize({ 
        width: windowRef.current?.offsetWidth || 500,
        height: windowRef.current?.offsetHeight || 400
      });
      setOriginalPosition({ x: position.x, y: position.y });
    }
    setIsMaximized(!isMaximized);
  };

  // Hide window when minimized
  if (isMinimized) {
    return null;
  }

  // Handle window resizing
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = currentSize.width;
    const startHeight = currentSize.height;

    const handleResize = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      
      // Handle horizontal resizing
      if (direction.includes('right')) {
        newWidth = Math.max(300, Math.min(window.innerWidth - position.x - 20, startWidth + deltaX));
      }
      
      // Handle vertical resizing  
      if (direction.includes('bottom')) {
        newHeight = Math.max(200, Math.min(window.innerHeight - position.y - 20, startHeight + deltaY));
      }
      
      setCurrentSize({ width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const windowStyle = {
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? '100vw' : currentSize.width,
    height: isMaximized ? '100vh' : currentSize.height,
    zIndex: zIndex,
  };

  return (
    <div ref={windowRef} className={windowClass} style={windowStyle} onClick={handleClick}>
      <div 
        className={`${styles.titleBar} ${headerColor ? styles.customHeader : ''}`}
        onMouseDown={handleTitleBarMouseDown}
        style={{
          borderTopLeftRadius: isMaximized ? '0' : '16px',
          borderTopRightRadius: isMaximized ? '0' : '16px',
        }}>
        <div className={styles.windowControls}>
          <button 
            className={`${styles.windowControl} ${styles.close} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            ×
          </button>
          <button 
            className={`${styles.windowControl} ${styles.minimize} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { 
              e.stopPropagation(); 
              handleMinimize(); 
            }}
            title="Minimize"
          >
            −
          </button>
          <button 
            className={`${styles.windowControl} ${styles.maximize} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? '⤓' : '+'}
          </button>
        </div>
        <div className={`${styles.windowTitle} ${headerColor ? styles.customHeader : ''}`}>
          {title}
        </div>
        <div style={{ width: '60px' }}></div>
      </div>
      <div className={styles.windowContent}>
        {children}
      </div>
      
      {/* Resize handles */}
      {!isMaximized && (
        <>
          {/* Right resize handle */}
          <div
            className={`${styles.resizeHandle} ${styles.right}`}
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          
          {/* Bottom resize handle */}
          <div
            className={`${styles.resizeHandle} ${styles.bottom}`}
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          
          {/* Bottom-right corner resize handle */}
          <div
            className={`${styles.resizeHandle} ${styles.corner}`}
            onMouseDown={(e) => handleResizeStart(e, 'right bottom')}
          />
          
          {/* Visual resize indicator in bottom-right corner */}
          <div className={styles.resizeCorner} />
        </>
      )}
    </div>
  );
};

export default Window;
