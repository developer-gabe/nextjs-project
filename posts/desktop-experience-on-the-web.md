---
title: 'Building a Desktop Experience in the Browser'
date: '2025-08-24'
tags: ['react', 'desktop', 'web', 'macos', 'desktop-experience']
---

A while back I set out to answer a dumb question: how close can I get to a full macOS style desktop environment inside the browser without shipping 20 npm libraries or melting my CPU? The result is a working desktop where you can drag icons, launch apps, juggle windows, and even open my resume like you would in Finder.

It is part nostalgia project, part portfolio, part "I wonder if I can."

## The Core Architecture

At the heart of the system is **React Context**. I wired up a `WindowContext` that handles all state for open windows, z index tracking, and lifecycle operations. From there, the rest of the system hangs off three main components:

- `WindowManager` – the conductor, responsible for rendering and stacking windows  
- `DesktopIcons` – the clickable, draggable starting point  
- `Dock` – a minimal bottom launcher, a nod to the macOS dock

Each piece is intentionally small. I wanted components that just do their job: no global event spaghetti, no hidden jQuery hacks.

## Windows That Feel Like Windows

The window system had to nail the basics: drag, resize, minimize, maximize, and proper layering.

Here is the `Window` component doing its thing:

```jsx
const Window = ({ id, title, children, onClose, position, zIndex, isActive }) => {
  const { bringToFront, updatePosition } = useWindows();
  const windowRef = useRef(null);

  // handle dragging
  const handleTitleBarMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    const element = windowRef.current;
    let posX = e.clientX;
    let posY = e.clientY;

    const dragElement = (e) => {
      element.style.top = element.offsetTop - (posY - e.clientY) + "px";
      element.style.left = element.offsetLeft - (posX - e.clientX) + "px";
      posX = e.clientX;
      posY = e.clientY;
    };

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', () => {
      updatePosition(id, { x: element.offsetLeft, y: element.offsetTop });
      document.removeEventListener('mousemove', dragElement);
    });
  };

  return (
    <div ref={windowRef} style={{ left: position.x, top: position.y, zIndex }}>
      <div onMouseDown={handleTitleBarMouseDown}>{title}</div>
      <div>{children}</div>
    </div>
  );
};```

It is not Electron. It is just React and mouse events. No extra dependencies.

## Finder in the Browser
I could not resist writing a fake Finder. It lets you double click into folders, open apps, or view images. Here is the important part: mapping file types to the right icon.

```jsx
const getIcon = (item) => {
  if (item.type === 'folder') {
    return <svg className={styles.folderIcon}> ... </svg>;
  }
  if (item.name.endsWith('.jpg')) {
    return <svg className={styles.imageIcon}> ... </svg>;
  }
  if (item.name.endsWith('.app')) {
    return <svg className={styles.appIcon}> ... </svg>;
  }
  return <svg className={styles.documentIcon}> ... </svg>;
};
```

That small switch statement turns a boring JSON mock file system into something you can actually click through.
When you double click Resume.pdf, it does not just show text. It opens a dedicated Resume window with styled content. Same goes for TextEditor.app, Terminal.app, or even the Fantasy Premier League dashboard I tucked in there for fun.

The Manager Behind It All
Managing z index and active state is the job of WindowManager. It calculates the highest z index and makes sure only one window is truly "active."
const WindowManager = () => {
  const { windows, closeWindow } = useWindows();
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
        >
          {window.component}
        </Window>
      ))}
    </>
  );
};
No guessing. No arbitrary CSS. Just math.
Why Bother?
Sure, no one asked me to make a fake desktop in the browser. But in the process I built:
A reusable window management system with drag, resize, and layering
A file browser with breadcrumb navigation and type aware launching
A clean pattern for integrating external systems like blog posts and photo galleries
A playground for side projects (apps like CodeCanvas and MusicVisualizer live here now)
And I got a desktop where double clicking Finder actually does something.
Closing Thoughts
This is not trying to replace your operating system. It is an experiment in UX and state management. A reminder that React can do more than render forms. And a fun excuse to ship an interactive resume that feels like booting up a personal OS.
If you want to try this pattern yourself, start with a simple WindowContext and a single draggable Window. You will be surprised how quickly it snowballs into a full desktop.