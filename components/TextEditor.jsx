import React, { useState } from 'react';

const TextEditor = () => {
  const [content, setContent] = useState('Welcome to TextEdit!\n\nThis is a simple text editor application.');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('system-ui');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const clearContent = () => {
    setContent('');
  };

  const addSampleText = () => {
    setContent(content + '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'var(--font-family-system)',
      background: 'var(--component-bg)'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderBottom: '1px solid var(--component-border)',
        background: 'var(--component-toolbar-bg)',
        gap: '12px'
      }}>
        <label style={{ fontSize: '13px', color: '#1d1d1f' }}>
          Font:
          <select 
            value={fontFamily} 
            onChange={handleFontFamilyChange}
            style={{
              marginLeft: '6px',
              padding: '2px 6px',
              fontSize: '12px',
              border: '1px solid #d1d1d6',
              borderRadius: '4px'
            }}
          >
            <option value="system-ui">System</option>
            <option value="monospace">Monaco</option>
            <option value="serif">Times</option>
            <option value="sans-serif">Helvetica</option>
          </select>
        </label>
        
        <label style={{ fontSize: '13px', color: '#1d1d1f' }}>
          Size:
          <select 
            value={fontSize} 
            onChange={handleFontSizeChange}
            style={{
              marginLeft: '6px',
              padding: '2px 6px',
              fontSize: '12px',
              border: '1px solid #d1d1d6',
              borderRadius: '4px'
            }}
          >
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="24">24</option>
          </select>
        </label>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={clearContent}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              background: 'var(--component-content-bg)',
              border: '1px solid var(--component-border)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
          <button
            onClick={addSampleText}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              background: 'var(--component-content-bg)',
              border: '1px solid var(--component-border)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Sample
          </button>
        </div>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={handleContentChange}
        style={{
          flex: 1,
          padding: '16px',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          lineHeight: '1.5',
          color: '#1d1d1f',
          background: 'var(--component-content-bg)'
        }}
        placeholder="Start typing..."
      />

      {/* Status Bar */}
      <div style={{
        padding: '6px 12px',
        borderTop: '1px solid var(--component-border)',
        background: 'var(--component-toolbar-bg)',
        fontSize: '11px',
        color: '#86868b',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>Characters: {content.length}</span>
        <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
      </div>
    </div>
  );
};

export default TextEditor;