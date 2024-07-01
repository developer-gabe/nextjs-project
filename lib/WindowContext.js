import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();
let highestZIndex = 100;

export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);

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

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, bringToFront, updatePosition }}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
