import React from 'react';
import { useWindows } from '../lib/WindowContext';
import Window from './Window';

const WindowManager = () => {
  const { windows, closeWindow, bringToFront } = useWindows();

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
          bringToFront={() => bringToFront(window.id)}
        >
          {window.component}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
