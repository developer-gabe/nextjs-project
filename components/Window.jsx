// components/Window.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useWindows } from '../lib/WindowContext';
import useIsMobile from '../lib/useIsMobile';
import styles from '../styles/Window.module.css';

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

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
  const isMobile = useIsMobile();

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

  // On mobile, set a sensible default window size relative to the viewport.
  useEffect(() => {
    if (isMobile && !isMaximized) {
      const w = Math.min(Math.floor(window.innerWidth * 0.92), 560);
      const h = Math.min(Math.floor(window.innerHeight * 0.80), 720);
      setCurrentSize({ width: w, height: h });

      // If current position would push the window off-screen, pull it back in.
      const element = windowRef.current;
      if (element) {
        const maxLeft = Math.max(0, window.innerWidth - w);
        const maxTop = Math.max(0, window.innerHeight - h);
        const newLeft = clamp(position.x, 0, maxLeft);
        const newTop = clamp(position.y, 0, maxTop);
        if (newLeft !== position.x || newTop !== position.y) {
          updatePosition(id, { x: newLeft, y: newTop });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isMaximized]);

  const windowClass = `${styles.windowContainer} ${isActive ? styles.active : styles.inactive} ${isResizing ? styles.resizing : ''} ${isMaximized ? styles.maximized : ''}`;

  // Handle title bar dragging (with bounds so you can't lose the window)
  const handleTitleBarMouseDown = (e) => {
    // Don't start dragging if we're resizing, clicking buttons, or maximized
    if (isResizing || isMaximized || e.target.tagName === 'BUTTON') return;

    bringToFront(id);
    e.preventDefault();

    const element = windowRef.current;
    if (!element) return;

    let startClientX = e.clientX;
    let startClientY = e.clientY;

    const dragElement = (e) => {
      e.preventDefault();
      const dx = e.clientX - startClientX;
      const dy = e.clientY - startClientY;
      startClientX = e.clientX;
      startClientY = e.clientY;

      const nextLeft = element.offsetLeft + dx;
      const nextTop = element.offsetTop + dy;

      const maxLeft = Math.max(0, window.innerWidth - element.offsetWidth);
      const maxTop = Math.max(0, window.innerHeight - element.offsetHeight);

      element.style.left = clamp(nextLeft, 0, maxLeft) + 'px';
      element.style.top = clamp(nextTop, 0, maxTop) + 'px';
    };

    const closeDragElement = () => {
      document.removeEventListener('mousemove', dragElement);
      document.removeEventListener('mouseup', closeDragElement);
      updatePosition(id, { x: element.offsetLeft, y: element.offsetTop });
    };

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', closeDragElement);
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

  // Handle window resizing (disabled on mobile)
  const handleResizeStart = (e, direction) => {
    if (isMobile) return;
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
    // On mobile, clamp to viewport-friendly sizes; on desktop, use current size.
    width: isMaximized ? '100vw' : (isMobile ? `min(92vw, ${currentSize.width}px)` : currentSize.width),
    height: isMaximized ? '100dvh' : (isMobile ? `min(80dvh, ${currentSize.height}px)` : currentSize.height),
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
        // Prevent the page from scrolling while you drag the title bar on touch devices
        style={{
          borderTopLeftRadius: isMaximized ? '0' : '16px',
          borderTopRightRadius: isMaximized ? '0' : '16px',
          touchAction: 'none'
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

      {/* Resize handles (hidden on mobile via CSS) */}
      {!isMaximized && (
        <>
          <div
            className={`${styles.resizeHandle} ${styles.right}`}
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.bottom}`}
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.corner}`}
            onMouseDown={(e) => handleResizeStart(e, 'right bottom')}
          />
          <div className={styles.resizeCorner} />
        </>
      )}
    </div>
  );
};

export default Window;
