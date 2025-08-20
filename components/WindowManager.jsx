import React from 'react';
import { useWindows } from '../lib/WindowContext';
import Window from './window';

const WindowManager = () => {
  const { windows, closeWindow, bringToFront } = useWindows();

  // Find the window with the highest zIndex to determine which is active
  const highestZIndex = Math.max(...windows.map(w => w.zIndex), 0);

  return (
    <>
      {windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          position={window.position}
          zIndex={window.zIndex}
          isActive={window.zIndex === highestZIndex}
          isMinimized={window.isMinimized}
          bringToFront={() => bringToFront(window.id)}
        >
          {window.component}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
