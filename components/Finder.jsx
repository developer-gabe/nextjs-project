import React, { useState } from 'react';
import { useWindows } from '../lib/WindowContext';

const Finder = () => {
  const { openWindow } = useWindows();
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock file system structure
  const fileSystem = {
    '/': {
      type: 'folder',
      name: 'Desktop',
      contents: {
        'Documents': {
          type: 'folder',
          name: 'Documents',
          contents: {
            'Resume.pdf': { type: 'file', name: 'Resume.pdf', icon: '📄' },
            'Projects': {
              type: 'folder',
              name: 'Projects',
              contents: {
                'Website.html': { type: 'file', name: 'Website.html', icon: '🌐' }
              }
            }
          }
        },
        'Pictures': {
          type: 'folder',
          name: 'Pictures',
          contents: {
            'vacation.jpg': { type: 'file', name: 'vacation.jpg', icon: '🖼️' },
            'family.png': { type: 'file', name: 'family.png', icon: '🖼️' }
          }
        },
        'Applications': {
          type: 'folder',
          name: 'Applications',
          contents: {
            'TextEdit.app': { type: 'file', name: 'TextEdit.app', icon: '📝' },
            'Calculator.app': { type: 'file', name: 'Calculator.app', icon: '🧮' }
          }
        }
      }
    }
  };

  const getCurrentFolder = () => {
    const pathParts = currentPath.split('/').filter(part => part);
    let current = fileSystem['/'];
    
    for (const part of pathParts) {
      if (current.contents && current.contents[part]) {
        current = current.contents[part];
      }
    }
    
    return current;
  };

  const handleItemClick = (itemName, item) => {
    setSelectedItem(itemName);
    
    if (item.type === 'folder') {
      // Navigate into folder on double click
    }
  };

  const handleItemDoubleClick = (itemName, item) => {
    if (item.type === 'folder') {
      const newPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;
      setCurrentPath(newPath);
      setSelectedItem(null);
    } else {
      // Open file in appropriate application
      openWindow(
        <div style={{ padding: '20px' }}>
          <h3>{item.name}</h3>
          <p>This is a mock file viewer for {item.name}</p>
          <p>In a real application, this would open the appropriate viewer for this file type.</p>
        </div>, 
        item.name
      );
    }
  };

  const handleBack = () => {
    if (currentPath !== '/') {
      const pathParts = currentPath.split('/').filter(part => part);
      pathParts.pop();
      const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
      setCurrentPath(newPath);
      setSelectedItem(null);
    }
  };

  const currentFolder = getCurrentFolder();
  const items = currentFolder.contents ? Object.entries(currentFolder.contents) : [];

  return (
    <div className="finder-window">
      <div className="finder-toolbar">
        <button 
          onClick={handleBack} 
          disabled={currentPath === '/'}
          className="finder-back-btn"
        >
          ← Back
        </button>
        <div className="finder-path">{currentPath}</div>
      </div>
      
      <div className="finder-content">
        <div className="finder-items">
          {items.map(([itemName, item]) => (
            <div
              key={itemName}
              className={`finder-item ${selectedItem === itemName ? 'selected' : ''}`}
              onClick={() => handleItemClick(itemName, item)}
              onDoubleClick={() => handleItemDoubleClick(itemName, item)}
            >
              <div className="finder-item-icon">
                {item.type === 'folder' ? '📁' : item.icon || '📄'}
              </div>
              <div className="finder-item-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finder;