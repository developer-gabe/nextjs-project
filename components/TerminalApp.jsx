import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';

const TerminalApp = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = (fullscreen) => {
    setIsFullScreen(fullscreen);
    
    // Hide/show other UI elements when going fullscreen
    if (fullscreen) {
      document.body.style.overflow = 'hidden';
      // Hide the window chrome when going fullscreen
      const windowElement = document.querySelector('.window-container');
      if (windowElement) {
        windowElement.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'auto';
      // Show the window chrome when exiting fullscreen
      const windowElement = document.querySelector('.window-container');
      if (windowElement) {
        windowElement.style.display = 'block';
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      const windowElement = document.querySelector('.window-container');
      if (windowElement) {
        windowElement.style.display = 'block';
      }
    };
  }, []);

  return <Terminal onFullScreen={handleFullScreen} />;
};

export default TerminalApp;