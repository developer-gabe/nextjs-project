import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  let highestZIndex = 100; 

  const openWindow = (component, title) => {
    const newPosition = {
      x: windows.length > 0 ? windows[windows.length - 1].position.x + 30 : 0,
      y: windows.length > 0 ? windows[windows.length - 1].position.y + 30 : 0
    };

    const newWindow = {
      id: Date.now(),
      component,
      title,
      isOpen: true,
      position: newPosition,
      zIndex: highestZIndex++
    };

    setWindows(prevWindows => [...prevWindows, newWindow]);
  };

  const closeWindow = id => {
    setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  };

  const bringToFront = id => {
    setWindows(prevWindows => {
      return prevWindows.map(window => {
        if (window.id === id) {
          return { ...window, zIndex: highestZIndex++ };
        }
        return window;
      });
    });
  };

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, bringToFront }}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
