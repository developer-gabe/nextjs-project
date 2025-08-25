import React, { useRef, useState } from 'react';
import { useWindows } from '../lib/WindowContext';
import styles from '../styles/Window.module.css';

const Window = ({
  id,
  title,
  children,
  onClose,
  position,
  zIndex,
  isActive,
  isMinimized,
  headerColor,
  size
}) => {
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

  // Handle title bar dragging
  const handleTitleBarMouseDown = (e) => {
    // Don't start dragging if we're already resizing, clicking on buttons, or maximized
    if (isResizing || isMaximized || e.target.tagName === 'BUTTON') return;

    bringToFront(id);
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

      if (!element) return;
      element.style.top = (element.offsetTop - posY) + 'px';
      element.style.left = (element.offsetLeft - posX) + 'px';
    };

    const closeDragElement = () => {
      document.removeEventListener('mousemove', dragElement);
      document.removeEventListener('mouseup', closeDragElement);
      if (!element) return;
      // Persist the position to context
      updatePosition(id, { x: element.offsetLeft, y: element.offsetTop });
    };

    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', dragElement);
  };

  const handleClick = () => {
    bringToFront(id);
  };

  const handleMinimize = () => {
    minimizeWindow(id);
  };

  const handleMaximize = () => {
    const element = windowRef.current;

    if (!isMaximized) {
      // Store current size and position before maximizing
      setOriginalSize({
        width: element?.offsetWidth || currentSize.width,
        height: element?.offsetHeight || currentSize.height
      });
      setOriginalPosition({ x: position.x, y: position.y });
      setIsMaximized(true);
    } else {
      // Restore to original size/position
      setIsMaximized(false);
      setCurrentSize({ width: originalSize.width, height: originalSize.height });
      updatePosition(id, { x: originalPosition.x, y: originalPosition.y });
    }
  };

  // Hide window when minimized
  if (isMinimized) {
    return null;
  }

  // Handle window resizing
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(id);
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
        newWidth = Math.max(
          300,
          Math.min(window.innerWidth - position.x - 20, startWidth + deltaX)
        );
      }

      // Handle vertical resizing
      if (direction.includes('bottom')) {
        newHeight = Math.max(
          200,
          Math.min(window.innerHeight - position.y - 20, startHeight + deltaY)
        );
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
    zIndex: zIndex
  };

  return (
    <div
      ref={windowRef}
      className={windowClass}
      style={windowStyle}
      onClick={handleClick}
      role="dialog"
      aria-labelledby={`window-title-${id}`}
    >
      <div
        className={`${styles.titleBar} ${headerColor ? styles.customHeader : ''}`}
        onMouseDown={handleTitleBarMouseDown}
        style={{
          borderTopLeftRadius: isMaximized ? '0' : '16px',
          borderTopRightRadius: isMaximized ? '0' : '16px'
        }}
      >
        <div className={styles.windowControls}>
          <button
            type="button"
            aria-label="Close window"
            className={`${styles.windowControl} ${styles.close} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Minimize window"
            className={`${styles.windowControl} ${styles.minimize} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            title="Minimize"
          >
            −
          </button>
          <button
            type="button"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            className={`${styles.windowControl} ${styles.maximize} ${!isActive ? styles.inactive : ''}`}
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? '⤓' : '+'}
          </button>
        </div>
        <div
          id={`window-title-${id}`}
          className={`${styles.windowTitle} ${headerColor ? styles.customHeader : ''}`}
        >
          {title}
        </div>
        <div style={{ width: '60px' }} />
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
