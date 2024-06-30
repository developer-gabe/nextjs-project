import React, { useEffect, useRef } from 'react';

const Window = ({ id, title, children, onClose, position, zIndex, bringToFront }) => {
  const windowRef = useRef(null);

  useEffect(() => {
    const element = windowRef.current;
    if (element) {
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.style.zIndex = zIndex;

      let posX = 0, posY = 0, posInitialX = 0, posInitialY = 0;

      const dragMouseDown = (e) => {
        e.preventDefault();
        posInitialX = e.clientX;
        posInitialY = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
      };

      const elementDrag = (e) => {
        e.preventDefault();
        posX = posInitialX - e.clientX;
        posY = posInitialY - e.clientY;
        posInitialX = e.clientX;
        posInitialY = e.clientY;
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
      };

      const closeDragElement = () => {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
      };

      element.onmousedown = dragMouseDown;

      return () => {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        element.onmousedown = null;
      };
    }
  }, [position, zIndex]);

  return (
    <div ref={windowRef} className="window-container" style={{ position: 'absolute' }} onClick={bringToFront}>
      <div className="title-bar">
        {title}
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 16 16">
				<rect width="4" height="15" fill="#251f54" x="6" y=".5" transform="rotate(45.001 8 8)"></rect>
				<rect width="4" height="15" fill="#251f54" x="6" y=".5" transform="rotate(134.999 8 8)"></rect>
			</svg></button>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Window;
