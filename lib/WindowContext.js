// lib/WindowContext.js
import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();
let highestZIndex = 100;

/** Limit configuration defaults */
const defaultLimits = {
  /** Maximum number of windows allowed overall. null = unlimited */
  globalMax: 8,
  /** What to do when global limit is hit: 'deny' | 'closeOldest' */
  globalStrategy: 'deny',
  /** Per-app limits: { [appId]: number | Infinity } */
  perApp: {
    // examples:
    // settings: 1,
    // finder: Infinity,
		finder: 4,
		blog: 1,
		photography: 1,
		lab: 1,
		matchpredictor: 1,
		codecanvas: 1,
		musicvisualizer: 1,
		terminal: 1,
		fpldashboard: 1,
		texteditor: 1,
		settings: 1,
  },
  /** What to do when a per-app limit is hit: 'focusExisting' | 'deny' */
  perAppStrategy: 'focusExisting',
};

export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children, initialLimits }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Limits state (merge user-provided initialLimits)
  const [limits, setLimits] = useState(() => ({
    ...defaultLimits,
    ...(initialLimits || {}),
    perApp: { ...defaultLimits.perApp, ...(initialLimits?.perApp || {}) },
  }));

  // ===== Helpers
  const getTopWindow = () => {
    if (!windows.length) return null;
    return [...windows].sort((a, b) => a.zIndex - b.zIndex).at(-1);
  };

  const countByApp = (appId) => windows.filter((w) => w.appId === appId).length;

  const getByApp = (appId) =>
    [...windows].filter((w) => w.appId === appId).sort((a, b) => a.zIndex - b.zIndex);

  const getOldestWindow = () =>
    [...windows].sort((a, b) => (a.openedAt ?? 0) - (b.openedAt ?? 0))[0] || null;

  const defaultPositionForNew = ({ width, height }) => {
    // Calculate center position for the window (with slight cascading offset)
    const windowWidth = width ?? 800;
    const windowHeight = height ?? 600;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    const baseX = (viewportWidth - windowWidth) / 2;
    const baseY = (viewportHeight - windowHeight) / 2;
    const offset = windows.length * 20;

    return {
      x: Math.max(0, Math.floor(baseX + offset)),
      y: Math.max(0, Math.floor(baseY + offset)),
    };
  };

  // ===== Active window mgmt
  const makeWindowActive = (id) => {
    setActiveWindowId(id);
    // Optionally ensure it's visually on top:
    bringToFront(id);
  };

  // ===== Core actions
  /**
   * Backward-compatible openWindow:
   * - Legacy: openWindow(component, title, headerColor)
   * - New: openWindow({ appId, id, title, component, position, size, headerColor, restoreIfMinimized })
   * Returns: { ok: boolean, windowId?: string|number, focusedExisting?: boolean, reason?: string }
   */
  const openWindow = (...args) => {
    let opts;

    if (
      args.length === 1 &&
      typeof args[0] === 'object' &&
      args[0] !== null &&
      // Heuristic to distinguish from a raw React element
      ('component' in args[0] || 'appId' in args[0] || 'title' in args[0])
    ) {
      opts = args[0];
    } else {
      // Legacy signature: (component, title, headerColor)
      const [component, title, headerColor = null] = args;
      opts = { component, title, headerColor };
    }

    const {
      appId = 'app',
      id,
      title = 'Untitled',
      component = null,
      position,
      size, // { width, height }
      headerColor = null,
      restoreIfMinimized = true,
    } = opts;

    // ---- Enforce per-app limit
    const perLimit = limits.perApp[appId];
    if (typeof perLimit !== 'undefined') {
      const appWindows = getByApp(appId);
      if (perLimit !== Infinity && appWindows.length >= perLimit) {
        if (limits.perAppStrategy === 'focusExisting' && appWindows.length > 0) {
          const topAppWindow = appWindows.at(-1);
          if (restoreIfMinimized && topAppWindow.isMinimized) {
            restoreWindow(topAppWindow.id);
          }
          bringToFront(topAppWindow.id);
          setActiveWindowId(topAppWindow.id);
          return { ok: true, windowId: topAppWindow.id, focusedExisting: true };
        }
        return { ok: false, reason: 'per-app-limit-reached' };
      }
    }

    // ---- Enforce global limit
    if (limits.globalMax != null && windows.length >= limits.globalMax) {
      if (limits.globalStrategy === 'closeOldest') {
        const oldest = getOldestWindow();
        if (oldest) {
          // Close oldest to make room
          setWindows((prev) => prev.filter((w) => w.id !== oldest.id));
        }
      } else {
        return { ok: false, reason: 'global-limit-reached' };
      }
    }

    // Position (center + cascade) if not provided
    const resolvedSize = {
      width: size?.width ?? 800,
      height: size?.height ?? 600,
    };
    const newPosition = position || defaultPositionForNew(resolvedSize);

    const newId = id ?? Date.now();

    const newWindow = {
      id: newId,
      appId,
      component,
      title,
      isOpen: true,
      isMinimized: false,
      position: newPosition,
      size: resolvedSize,
      zIndex: ++highestZIndex,
      headerColor,
      openedAt: Date.now(),
    };

    setWindows((prevWindows) => [...prevWindows, newWindow]);
    setActiveWindowId(newId);
    return { ok: true, windowId: newId, focusedExisting: false };
  };

  const closeWindow = (id) => {
    setWindows((prevWindows) => prevWindows.filter((window) => window.id !== id));
    if (activeWindowId === id) {
      const top = getTopWindow();
      setActiveWindowId(top?.id ?? null);
    }
  };

  const bringToFront = (id) => {
    setWindows((prevWindows) => {
      const idx = prevWindows.findIndex((w) => w.id === id);
      if (idx === -1) return prevWindows;
      const updated = { ...prevWindows[idx], zIndex: ++highestZIndex, isMinimized: false };
      const next = [...prevWindows];
      next[idx] = updated;
      return next;
    });
    setActiveWindowId(id);
  };

  const updatePosition = (id, newPosition) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) => (window.id === id ? { ...window, position: newPosition } : window))
    );
  };

  const minimizeWindow = (id) => {
    // console logs kept to match your current behavior
    console.log('Minimizing window with id:', id);
    setWindows((prevWindows) => {
      const updatedWindows = prevWindows.map((window) => {
        if (window.id === id) {
          console.log('Found window to minimize:', window.title, 'current isMinimized:', window.isMinimized);
          return { ...window, isMinimized: true };
        }
        return window;
      });
      console.log(
        'After minimize - Updated windows:',
        updatedWindows.map((w) => ({ id: w.id, title: w.title, isMinimized: w.isMinimized }))
      );
      return updatedWindows;
    });
    if (activeWindowId === id) {
      const top = getTopWindow();
      setActiveWindowId(top?.id ?? null);
    }
  };

  const restoreWindow = (id) => {
    console.log('Restoring window with id:', id);
    setWindows((prevWindows) => {
      const updatedWindows = prevWindows.map((window) => {
        if (window.id === id) {
          console.log('Found window to restore:', window.title, 'isMinimized:', window.isMinimized);
          return { ...window, isMinimized: false, zIndex: ++highestZIndex };
        }
        return window;
      });
      console.log(
        'Updated windows:',
        updatedWindows.map((w) => ({ id: w.id, title: w.title, isMinimized: w.isMinimized }))
      );
      return updatedWindows;
    });
    setActiveWindowId(id);
  };

  // ===== Limit setters (public API)
  const setGlobalLimit = (n, strategy = limits.globalStrategy) =>
    setLimits((prev) => ({ ...prev, globalMax: n, globalStrategy: strategy }));

  const setPerAppLimit = (appId, n, strategy = limits.perAppStrategy) =>
    setLimits((prev) => ({
      ...prev,
      perApp: { ...prev.perApp, [appId]: n },
      perAppStrategy: strategy,
    }));

  const setLimitConfig = (config) =>
    setLimits((prev) => ({
      ...prev,
      ...config,
      perApp: { ...prev.perApp, ...(config?.perApp || {}) },
    }));

  return (
    <WindowContext.Provider
      value={{
        windows,
        limits,
        activeWindowId,
        // queries
        getTopWindow,
        countByApp,
        getByApp,
        // actions
        openWindow,
        closeWindow,
        bringToFront,
        updatePosition,
        makeWindowActive,
        minimizeWindow,
        restoreWindow,
        // limit controls
        setGlobalLimit,
        setPerAppLimit,
        setLimitConfig,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
