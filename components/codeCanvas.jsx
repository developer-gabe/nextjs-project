import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function CodeCanvas() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
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
    try {
      // Validate JavaScript
      const jsValidation = validateJs(js);
      if (!jsValidation.isValid) {
        setError(jsValidation.errorMessage);
        return;
      }

      // Sanitize HTML and CSS
      const sanitizedHtml = sanitizeHtml(html);
      const sanitizedCss = validateCss(css);

      // Create secure output
      const secureOutput = `
        <!DOCTYPE html>
        <html>
          <head>
            ${cspHeader}
            <style>
              /* Restrict iframe content */
              html, body {
                margin: 0;
                padding: 10px;
                box-sizing: border-box;
                max-width: 100%;
                overflow-x: hidden;
              }
              ${sanitizedCss}
            </style>
          </head>
          <body>
            ${sanitizedHtml}
            <script>
              // Sandbox the JavaScript execution
              try {
                (function() {
                  'use strict';
                  // Remove access to window object
                  const window = undefined;
                  const document = {
                    // Provide limited document API
                    querySelector: function(selector) {
                      return document.querySelectorAll(selector)[0];
                    },
                    querySelectorAll: function(selector) {
                      return Array.from(document.getElementsByTagName('*')).filter(el => 
                        el.matches(selector)
                      );
                    },
                    getElementById: function(id) {
                      return document.querySelector('#' + id);
                    }
                  };
                  ${js}
                })();
              } catch (error) {
                console.error('Runtime error:', error);
              }
            </script>
          </body>
        </html>
      `;

      setOutput(secureOutput);
      setError('');
    } catch (error) {
      setError('An error occurred while processing the code.');
      console.error('Error:', error);
    }
  }

  return (
    <div className="CodeCanvas">
      <div className="CodeCanvas-editor">
        <div className="CodeCanvas-editor__window">
          <h3>HTML</h3>
          <textarea 
            value={html} 
            onChange={handleHtmlChange}
            placeholder="Enter HTML code here..."
          ></textarea>
        </div>
        <div className="CodeCanvas-editor__window">
          <h3>CSS</h3>
          <textarea 
            value={css} 
            onChange={handleCssChange}
            placeholder="Enter CSS code here..."
          ></textarea>
        </div>
        <div className="CodeCanvas-editor__window">
          <h3>JavaScript</h3>
          <textarea 
            value={js} 
            onChange={handleJsChange}
            placeholder="Enter JavaScript code here..."
          ></textarea>
        </div>
        <div className="CodeCanvas-output">
          <h3>Output</h3>
          {error && <div className="error-message">{error}</div>}
          <iframe 
            title="output" 
            srcDoc={output}
            sandbox={sandboxAttributes}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <button onClick={runCode}>Run</button>

      <style jsx>{`
        .error-message {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 0.75rem;
          margin: 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
        }

        @media (prefers-color-scheme: dark) {
          .error-message {
            background-color: #7f1d1d;
            color: #fecaca;
          }
        }
      `}</style>
    </div>
  );
}

export default CodeCanvas;
