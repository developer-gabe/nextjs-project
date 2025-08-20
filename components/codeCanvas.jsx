import React, { useState, useEffect } from 'react';
import styles from '../styles/CodeCanvas.module.css';

function CodeCanvas() {
  const [html, setHtml] = useState('<h1>Hello World!</h1>\n<p>Start coding here...</p>');
  const [css, setCss] = useState('body {\n  font-family: system-ui;\n  padding: 20px;\n}\n\nh1 {\n  color: #002c1c;\n}');
  const [js, setJs] = useState('console.log("CodeCanvas is ready!");');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Sandbox configuration for iframe
  const sandboxAttributes = [
    'allow-scripts',       // Allow script execution but in a sandboxed environment
    'allow-modals',        // Allow alert/confirm/prompt
    'allow-forms',         // Allow form submission
  ].join(' ');

  // Security headers for iframe
  const cspHeader = `
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'none';
      script-src 'unsafe-inline';
      style-src 'unsafe-inline';
      img-src data: https:;
      connect-src 'none';
      font-src 'none';
      object-src 'none';
      media-src 'none';
      frame-src 'none';
      form-action 'none';
      base-uri 'none';
    ">
  `;

  // Function to validate and sanitize HTML
  const sanitizeHtml = (input) => {
    // Remove any script tags with src attribute
    const noExternalScripts = input.replace(/<script[^>]*src=[^>]*>/gi, '');
    return DOMPurify.sanitize(noExternalScripts, {
      FORBID_TAGS: ['iframe', 'script', 'style', 'link', 'meta', 'object', 'embed'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'eval']
    });
  };

  // Function to validate CSS
  const validateCss = (input) => {
    // Remove potentially dangerous CSS
    return input
      .replace(/@import/gi, '/* @import not allowed */')
      .replace(/expression/gi, '/* expression not allowed */')
      .replace(/url\(/gi, '/* url() not allowed */');
  };

  // Function to validate JavaScript
  const validateJs = (input) => {
    const blacklist = [
      'document.cookie',
      'localStorage',
      'sessionStorage',
      'indexedDB',
      'window.parent',
      'window.top',
      'eval(',
      'Function(',
      'fetch(',
      'XMLHttpRequest',
      'WebSocket',
      'Worker',
      'navigator',
      'document.domain',
    ];

    let isValid = true;
    let errorMessage = '';

    blacklist.forEach(term => {
      if (input.includes(term)) {
        isValid = false;
        errorMessage = `Forbidden code detected: ${term}`;
      }
    });

    return { isValid, errorMessage };
  };

  function handleHtmlChange(event) {
    setHtml(event.target.value);
    setError('');
  }

  function handleCssChange(event) {
    setCss(event.target.value);
    setError('');
  }

  function handleJsChange(event) {
    setJs(event.target.value);
    setError('');
  }

  function runCode() {
    setOutput(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              document.body.innerHTML += '<div style="color: red; font-family: monospace; margin-top: 20px;">Error: ' + error.message + '</div>';
            }
          </script>
        </body>
      </html>
    `);
  }

  // Auto-run on mount
  useEffect(() => {
    runCode();
  }, []);

  return (
    <div className={styles.codeCanvas}>
      <div className={styles.toolbar}>
        <h1 className={styles.toolbarTitle}>CodeCanvas</h1>
        <button className={styles.runButton} onClick={runCode}>
          ▶ Run Code
        </button>
      </div>
      
      <div className={styles.editorContainer}>
        <div className={`${styles.editorPanel} ${styles.htmlPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>HTML</h3>
          </div>
          <textarea 
            className={styles.editor}
            value={html} 
            onChange={handleHtmlChange}
            placeholder="Enter your HTML here..."
          />
        </div>
        
        <div className={`${styles.editorPanel} ${styles.cssPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>CSS</h3>
          </div>
          <textarea 
            className={styles.editor}
            value={css} 
            onChange={handleCssChange}
            placeholder="Enter your CSS here..."
          />
        </div>
        
        <div className={`${styles.editorPanel} ${styles.jsPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>JavaScript</h3>
          </div>
          <textarea 
            className={styles.editor}
            value={js} 
            onChange={handleJsChange}
            placeholder="Enter your JavaScript here..."
          />
        </div>
        
        <div className={styles.outputPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Output</h3>
          </div>
          <iframe 
            className={styles.output}
            title="output" 
            srcDoc={output}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

export default CodeCanvas;
