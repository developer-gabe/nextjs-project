import React, { useState } from 'react';
import { useWindows } from '../lib/WindowContext';
import styles from '../styles/Finder.module.css';
import Resume from './Resume';
import CodeCanvas from './codeCanvas';
import MusicVisualizer from './lavalamp';
import TextEditor from './TextEditor';
import TerminalApp from './TerminalApp';
import FPLDashboard from './FPLDashboard';

const Finder = ({ initialPath = '/' }) => {
  const { openWindow } = useWindows();
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to get SVG icon based on file type
  const getIcon = (item) => {
    if (item.type === 'folder') {
      // Use desktop icons for specific system folders
      if (item.name === 'Applications') {
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.folderIcon}>
            <rect x="3" y="3" width="6" height="6" rx="2"></rect>
            <rect x="15" y="3" width="6" height="6" rx="2"></rect>
            <rect x="3" y="15" width="6" height="6" rx="2"></rect>
            <rect x="15" y="15" width="6" height="6" rx="2"></rect>
          </svg>
        );
      }
      
      if (item.name === 'Pictures') {
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.imageIcon}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21,15 16,10 5,21"></polyline>
          </svg>
        );
      }
      
      // Default folder icon for other folders
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.folderIcon}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    }
    
    // File type specific icons
    const fileName = item.name.toLowerCase();
    
    if (fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.txt')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.documentIcon}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      );
    }
    
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.imageIcon}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21,15 16,10 5,21"></polyline>
        </svg>
      );
    }
    
    if (fileName.endsWith('.html') || fileName.endsWith('.htm')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.webIcon}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    }
    
    if (fileName.endsWith('.app')) {
      if (fileName.includes('calculator')) {
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.calculatorIcon}>
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="8" y1="10" x2="16" y2="10"></line>
            <line x1="8" y1="14" x2="16" y2="14"></line>
            <line x1="8" y1="18" x2="16" y2="18"></line>
          </svg>
        );
      }
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.appIcon}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="3"></line>
          <line x1="15" y1="1" x2="15" y2="3"></line>
          <line x1="9" y1="21" x2="9" y2="23"></line>
          <line x1="15" y1="21" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="22" y2="9"></line>
          <line x1="20" y1="14" x2="22" y2="14"></line>
          <line x1="1" y1="9" x2="3" y2="9"></line>
          <line x1="1" y1="14" x2="3" y2="14"></line>
        </svg>
      );
    }
    
    // Default file icon
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.documentIcon}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
      </svg>
    );
  };

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
            'Resume.pdf': { type: 'file', name: 'Resume.pdf' },
          }
        },
        'Pictures': {
          type: 'folder',
          name: 'Pictures',
          contents: {
            'DSC00075.jpg': { type: 'file', name: 'DSC00075.jpg', path: '/images/gallery/DSC00075.jpg' },
            'DSC00236.jpg': { type: 'file', name: 'DSC00236.jpg', path: '/images/gallery/DSC00236.jpg' },
            'DSC00331.jpg': { type: 'file', name: 'DSC00331.jpg', path: '/images/gallery/DSC00331.jpg', title: 'Somewhere outside Alamosa, Colorado' },
            'DSC00792.jpg': { type: 'file', name: 'DSC00792.jpg', path: '/images/gallery/DSC00792.jpg' },
            'DSC00838.jpg': { type: 'file', name: 'DSC00838.jpg', path: '/images/gallery/DSC00838.jpg' },
            'DSC01000.jpg': { type: 'file', name: 'DSC01000.jpg', path: '/images/gallery/DSC01000.jpg' },
            'DSC01586.jpg': { type: 'file', name: 'DSC01586.jpg', path: '/images/gallery/DSC01586.jpg' },
            'DSC01636.jpg': { type: 'file', name: 'DSC01636.jpg', path: '/images/gallery/DSC01636.jpg' },
            'DSC03401.jpg': { type: 'file', name: 'DSC03401.jpg', path: '/images/gallery/DSC03401.jpg' },
            'DSC06100.jpg': { type: 'file', name: 'DSC06100.jpg', path: '/images/gallery/DSC06100.jpg' },
            'rmnp.jpg': { type: 'file', name: 'rmnp.jpg', path: '/images/gallery/rmnp.jpg', title: 'Rocky Mountain National Park' },
            'tall.jpg': { type: 'file', name: 'tall.jpg', path: '/images/gallery/tall.jpg' }
          }
        },
        'Applications': {
          type: 'folder',
          name: 'Applications',
          contents: {
            'TextEditor.app': { type: 'file', name: 'TextEditor.app', component: 'TextEditor' },
            'CodeCanvas.app': { type: 'file', name: 'CodeCanvas.app', component: 'CodeCanvas' },
            'MusicVisualizer.app': { type: 'file', name: 'MusicVisualizer.app', component: 'MusicVisualizer' },
            'Terminal.app': { type: 'file', name: 'Terminal.app', component: 'Terminal' },
            'FPLDashboard.app': { type: 'file', name: 'FPLDashboard.app', component: 'FPLDashboard' }
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
      const fileName = item.name.toLowerCase();
      
      if (fileName === 'resume.pdf') {
        // Open resume component for the resume file
        openWindow(<Resume />, "Gabriel Araujo-Sousa - Resume");
      } else if (item.component) {
        // Open application components
        const componentName = item.component;
        let ComponentToOpen;
        let windowTitle;
        
        switch (componentName) {
          case 'TextEditor':
            ComponentToOpen = TextEditor;
            windowTitle = "TextEditor";
            break;
          case 'CodeCanvas':
            ComponentToOpen = CodeCanvas;
            windowTitle = "CodeCanvas";
            break;
          case 'MusicVisualizer':
            ComponentToOpen = MusicVisualizer;
            windowTitle = "Music Visualizer";
            break;
          case 'Terminal':
            ComponentToOpen = TerminalApp;
            windowTitle = "Terminal";
            break;
          case 'FPLDashboard':
            ComponentToOpen = FPLDashboard;
            windowTitle = "FPL Dashboard";
            break;
          default:
            return;
        }
        
        // Pass header colors for specific apps
        let headerColor = null;
        if (componentName === 'Terminal') {
          headerColor = '#000000'; // Pure black for terminal (Hyper Term Black theme)
        } else if (componentName === 'CodeCanvas') {
          headerColor = '#000000'; // Pure black for code canvas (Hyper Term Black theme)
        }
        
        openWindow(<ComponentToOpen />, windowTitle, headerColor);
      } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
        // Photo viewer for images
        const PhotoViewer = () => (
          <div style={{ 
            padding: '0', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            fontFamily: 'var(--font-family-system)'
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e5e5e5',
              background: '#f6f6f6',
              fontSize: '13px',
              fontWeight: '500',
              color: '#1d1d1f'
            }}>
              {item.title || item.name}
            </div>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '20px',
              background: '#ffffff'
            }}>
              <img 
                src={item.path} 
                alt={item.title || item.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>
          </div>
        );
        openWindow(<PhotoViewer />, item.title || item.name);
      } else {
        // Generic file viewer for other files
        openWindow(
          <div style={{ padding: '20px', fontFamily: 'var(--font-family-system)' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>{item.name}</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>This is a mock file viewer for {item.name}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>In a real application, this would open the appropriate viewer for this file type.</p>
          </div>, 
          item.name
        );
      }
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
    <div className={styles.finderWindow}>
      <div className={styles.finderToolbar}>
        <button 
          onClick={handleBack} 
          disabled={currentPath === '/'}
          className={styles.finderBackBtn}
        >
          ← Back
        </button>
        <div className={styles.finderPath}>{currentPath}</div>
      </div>
      
      <div className={styles.finderContent}>
        <div className={styles.finderItems}>
          {items.map(([itemName, item]) => (
            <div
              key={itemName}
              className={`${styles.finderItem} ${selectedItem === itemName ? styles.selected : ''}`}
              onClick={() => handleItemClick(itemName, item)}
              onDoubleClick={() => handleItemDoubleClick(itemName, item)}
            >
              <div className={styles.finderItemIcon}>
                {getIcon(item)}
              </div>
              <div className={styles.finderItemName}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finder;