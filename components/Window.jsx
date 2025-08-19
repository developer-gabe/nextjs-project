import React, { useEffect, useRef, useState } from 'react';
import { useWindows } from '../lib/WindowContext';

const Window = ({ id, title, children, onClose, position, zIndex, isActive, isMinimized }) => {
  const { bringToFront, updatePosition, minimizeWindow } = useWindows();
  const windowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 500, height: 400 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });

	const windowClass = isActive ? "window-container active-window" : "window-container";

  useEffect(() => {
    const element = windowRef.current;
    if (element) {
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.style.zIndex = zIndex;

      const dragMouseDown = (e) => {
        e.preventDefault();
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

      element.onmousedown = dragMouseDown;
    }
  }, [position, zIndex, updatePosition, id]);

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

  const windowStyle = {
    position: 'absolute',
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? '100vw' : originalSize.width,
    height: isMaximized ? '100vh' : originalSize.height,
    zIndex: zIndex,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #f0f0f0, #e8e8e8)',
    border: '1px solid #999',
    borderRadius: isMaximized ? '0' : '8px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.5) inset',
    overflow: 'hidden',
    minWidth: '300px',
    minHeight: '200px',
		padding: "0px"
  };

  return (
    <div ref={windowRef} className="window-container" style={windowStyle} onClick={handleClick}>
      <div className="title-bar" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '8px 12px',
        background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
        borderBottom: '1px solid #bbb',
        borderTopLeftRadius: isMaximized ? '0' : '7px',
        borderTopRightRadius: isMaximized ? '0' : '7px',
        flexShrink: 0,
        height: '44px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', gap: '8px', padding: '5px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid black',
              borderRadius: '50%',
              cursor: 'pointer',
              background: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'black',
              fontWeight: 'bold'
            }}
            title="Close"
          >
            ×
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              console.log('MINIMIZE BUTTON CLICKED!'); 
              handleMinimize(); 
            }}
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid black',
              borderRadius: '50%',
              cursor: 'pointer',
              background: 'orange',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold'
            }}
            title="Minimize"
          >
            −
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid black',
              borderRadius: '50%',
              cursor: 'pointer',
              background: 'green',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold'
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? '⤓' : '+'}
          </button>
        </div>
        <div style={{ 
          flex: 1, 
          textAlign: 'center', 
          fontSize: '13px', 
          fontWeight: '500', 
          color: '#333',
          margin: '0 12px'
        }}>
          {title}
        </div>
        <div style={{ width: '80px' }}></div>
      </div>
      <div className="content" style={{
        flex: 1,
        background: 'white',
        overflow: 'auto',
        padding: '16px',
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
