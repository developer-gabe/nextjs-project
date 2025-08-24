import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();
let highestZIndex = 100;

export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
	const [activeWindowId, setActiveWindowId] = useState(null);

// Method to set a window as active
const makeWindowActive = (id) => {
    setActiveWindowId(id);
    // bringToFront logic here if necessary
};

  const openWindow = (component, title, headerColor = null) => {
    // Calculate center position for the window
    const windowWidth = 800; // Default window width
    const windowHeight = 600; // Default window height
    
    // Get viewport dimensions (fallback to reasonable defaults if not available)
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    // Center the window on screen with a small offset for subsequent windows
    const baseX = (viewportWidth - windowWidth) / 2;
    const baseY = (viewportHeight - windowHeight) / 2;
    
    const newPosition = {
      x: Math.max(0, baseX + (windows.length * 20)),
      y: Math.max(0, baseY + (windows.length * 20))
    };

    const newWindow = {
      id: Date.now(),
      component,
      title,
      isOpen: true,
      isMinimized: false,
      position: newPosition,
      zIndex: highestZIndex++,
      headerColor
    };

    setWindows(prevWindows => [...prevWindows, newWindow]);
  };

  const closeWindow = id => {
    setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  };

  const bringToFront = id => {
    setWindows(prevWindows => {
      const windowIndex = prevWindows.findIndex(window => window.id === id);
      const newWindow = { ...prevWindows[windowIndex], zIndex: highestZIndex++ };
      return [
        ...prevWindows.slice(0, windowIndex),
        newWindow,
        ...prevWindows.slice(windowIndex + 1)
      ];
    });
  };

  const updatePosition = (id, newPosition) => {
    setWindows(prevWindows => {
      return prevWindows.map(window => {
        if (window.id === id) {
          return { ...window, position: newPosition };
        }
        return window;
      });
    });
  };

  const minimizeWindow = (id) => {
    console.log('Minimizing window with id:', id);
    setWindows(prevWindows => {
      const updatedWindows = prevWindows.map(window => {
        if (window.id === id) {
          console.log('Found window to minimize:', window.title, 'current isMinimized:', window.isMinimized);
          return { ...window, isMinimized: true };
        }
        return window;
      });
      console.log('After minimize - Updated windows:', updatedWindows.map(w => ({ id: w.id, title: w.title, isMinimized: w.isMinimized })));
      return updatedWindows;
    });
  };

  const restoreWindow = (id) => {
    console.log('Restoring window with id:', id);
    setWindows(prevWindows => {
      const updatedWindows = prevWindows.map(window => {
        if (window.id === id) {
          console.log('Found window to restore:', window.title, 'isMinimized:', window.isMinimized);
          return { ...window, isMinimized: false, zIndex: highestZIndex++ };
        }
        return window;
      });
      console.log('Updated windows:', updatedWindows.map(w => ({ id: w.id, title: w.title, isMinimized: w.isMinimized })));
      return updatedWindows;
    });
  };

  return (
		<WindowContext.Provider value={{ windows, openWindow, closeWindow, bringToFront, updatePosition, makeWindowActive, activeWindowId, minimizeWindow, restoreWindow }}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
