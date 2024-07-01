import React, { useEffect, useRef } from 'react';
import { useWindows } from '../lib/WindowContext';

const Window = ({ id, title, children, onClose, position, zIndex }) => {
  const { bringToFront, updatePosition } = useWindows();
  const windowRef = useRef(null);

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

  return (
    <div ref={windowRef} className="window-container" style={{ position: 'absolute' }} onClick={handleClick}>
      <div className="title-bar">
        {title}
				<button onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
            <rect width="4" height="15" fill="#251f54" x="6" y=".5" transform="rotate(45.001 8 8)"></rect>
            <rect width="4" height="15" fill="#251f54" x="6" y=".5" transform="rotate(134.999 8 8)"></rect>
          </svg>
        </button>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Window;
