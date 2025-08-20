import React, { useState, useEffect } from 'react';
import styles from '../styles/CodeCanvas.module.css';

function CodeCanvas() {
  const [html, setHtml] = useState('<h1>Hello World!</h1>\n<p>Start coding here...</p>');
  const [css, setCss] = useState('body {\n  font-family: system-ui;\n  padding: 20px;\n}\n\nh1 {\n  color: #002c1c;\n}');
  const [js, setJs] = useState('console.log("CodeCanvas is ready!");');
  const [output, setOutput] = useState('');

  function handleHtmlChange(event) {
    setHtml(event.target.value);
  }

  function handleCssChange(event) {
    setCss(event.target.value);
  }

  function handleJsChange(event) {
    setJs(event.target.value);
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
