import React, { useState } from 'react';

function CodeCanvas() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
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
      <html>
        <style>${css}</style>
        <body>${html}</body>
        <script>${js}</script>
      </html>
    `);
  }

  return (
    <div className="CodeCanvas">
      <div className="CodeCanvas-editor">
        <div className="CodeCanvas-editor__window">
          <h3>HTML</h3>
          <textarea value={html} onChange={handleHtmlChange}></textarea>
        </div>
        <div className="CodeCanvas-editor__window">
          <h3>CSS</h3>
          <textarea value={css} onChange={handleCssChange}></textarea>
        </div>
        <div className="CodeCanvas-editor__window">
          <h3>JavaScript</h3>
          <textarea value={js} onChange={handleJsChange}></textarea>
        </div>
				<div className="CodeCanvas-output">
        <h3>Output</h3>
        <iframe title="output" srcDoc={output}></iframe>
      </div>
      </div>
			<button onClick={runCode}>Run</button>
    </div>
  );
}

export default CodeCanvas;
