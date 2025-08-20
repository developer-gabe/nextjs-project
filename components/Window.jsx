import React, { useEffect, useRef, useState } from 'react';
import { useWindows } from '../lib/WindowContext';

const Window = ({ id, title, children, onClose, position, zIndex, isActive, isMinimized, headerColor }) => {
  const { bringToFront, updatePosition, minimizeWindow } = useWindows();
  const windowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 800, height: 600 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [currentSize, setCurrentSize] = useState({ width: 800, height: 600 });

	const windowClass = isActive ? "window-container active-window" : "window-container";

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
    position: 'absolute !important',
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? '100vw' : currentSize.width,
    height: isMaximized ? '100vh' : currentSize.height,
    zIndex: zIndex,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: isMaximized ? '0' : '12px',
    boxShadow: isResizing
      ? '0 25px 50px rgba(0,0,0,0.3), 0 0 0 2px rgba(0,123,255,0.5) inset'
      : isActive 
        ? '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.8) inset'
        : '0 10px 25px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset',
    overflow: 'hidden',
    minWidth: '300px',
    minHeight: '200px',
    padding: "0px",
    transition: isResizing ? 'none' : 'box-shadow 0.2s ease'
  };

  return (
    <div ref={windowRef} className="window-container" style={windowStyle} onClick={handleClick}>
      <div 
        className="title-bar" 
        onMouseDown={handleTitleBarMouseDown}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '12px 16px',
          background: headerColor 
            ? (isActive 
                ? headerColor
                : `${headerColor}dd`)
            : (isActive 
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(245,245,245,0.7)'),
          borderBottom: headerColor 
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
          borderTopLeftRadius: isMaximized ? '0' : '12px',
          borderTopRightRadius: isMaximized ? '0' : '12px',
          flexShrink: 0,
          height: '52px',
          boxSizing: 'border-box',
          cursor: 'move'
        }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{
              width: '12px',
              height: '12px',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: isActive ? '#FF5F57' : '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'transparent',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (isActive) e.target.style.color = headerColor ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'transparent';
            }}
            title="Close"
          >
            ×
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              handleMinimize(); 
            }}
            style={{
              width: '12px',
              height: '12px',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: isActive ? '#FFBD2E' : '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'transparent',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (isActive) e.target.style.color = headerColor ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'transparent';
            }}
            title="Minimize"
          >
            −
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            style={{
              width: '12px',
              height: '12px',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: isActive ? '#28CA42' : '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'transparent',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (isActive) e.target.style.color = headerColor ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'transparent';
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? '⤓' : '+'}
          </button>
        </div>
        <div style={{ 
          flex: 1, 
          textAlign: 'center', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: headerColor 
            ? (isActive ? '#ffffff' : '#cccccc')
            : (isActive ? '#333' : '#666'),
          margin: '0 12px',
          transition: 'color 0.2s ease'
        }}>
          {title}
        </div>
        <div style={{ width: '60px' }}></div>
      </div>
      <div className="content" style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.9)',
        overflow: 'auto',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
      
      {/* Resize handles */}
      {!isMaximized && (
        <>
          {/* Right resize handle */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '12px',
              bottom: '16px',
              width: '6px',
              cursor: 'ew-resize',
              background: 'transparent',
              zIndex: 5
            }}
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          
          {/* Bottom resize handle */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '12px',
              right: '16px',
              height: '6px',
              cursor: 'ns-resize',
              background: 'transparent',
              zIndex: 5
            }}
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          
          {/* Bottom-right corner resize handle */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '16px',
              height: '16px',
              cursor: 'se-resize',
              background: 'transparent',
              zIndex: 10
            }}
            onMouseDown={(e) => handleResizeStart(e, 'right bottom')}
          />
          
          {/* Visual resize indicator in bottom-right corner */}
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              background: 'linear-gradient(-45deg, transparent 30%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 35%, transparent 35%, transparent 65%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.1) 70%, transparent 70%)',
              pointerEvents: 'none',
              borderRadius: '0 0 12px 0'
            }}
          />
        </>
      )}
    </div>
  );
};

export default Window;
