import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';

const Terminal = ({ onFullScreen }) => {
  const [currentPhase, setCurrentPhase] = useState('loading'); // 'loading', 'prompt', 'fullscreen'
  const [loadingText, setLoadingText] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [userInput, setUserInput] = useState('');
  const terminalRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  const loadingSequence = [
    'Initializing secure connection...',
    'Bypassing firewall protocols...',
    'Scanning network topology...',
    'Injecting payload into main server...',
    'Decrypting authentication tokens...',
    'Accessing database clusters...',
    'Extracting user credentials...',
    'Mapping file system structure...',
    'Downloading source code...',
    'Analyzing security vulnerabilities...',
    'Preparing exploitation toolkit...',
    'Connection established. Ready to proceed.',
  ];

  const codeLines = [
    '// NextJS Application - Main Entry Point',
    'import React from "react";',
    'import { WindowProvider } from "../lib/WindowContext";',
    'import DesktopIcons from "../components/DesktopIcons";',
    '',
    'const App = () => {',
    '  const [isHacked, setIsHacked] = useState(false);',
    '  const [userAccess, setUserAccess] = useState("guest");',
    '',
    '  // Security vulnerability detected here!',
    '  useEffect(() => {',
    '    if (userAccess === "admin") {',
    '      console.log("Full system access granted");',
    '      setIsHacked(true);',
    '    }',
    '  }, [userAccess]);',
    '',
    '  const grantAccess = () => {',
    '    setUserAccess("admin"); // This should be protected!',
    '    console.log("WARNING: Unauthorized access detected");',
    '  };',
    '',
    '  return (',
    '    <div className="desktop">',
    '      <WindowProvider>',
    '        <DesktopIcons />',
    '        {isHacked && <div>SYSTEM COMPROMISED</div>}',
    '      </WindowProvider>',
    '    </div>',
    '  );',
    '};',
    '',
    'export default App;',
  ];

  useEffect(() => {
    if (currentPhase === 'loading') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < loadingSequence.length) {
          setLoadingText(prev => prev + loadingSequence[currentIndex] + '\n');
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowPrompt(true);
            setCurrentPhase('prompt');
          }, 1000);
        }
      }, Math.random() * 800 + 400); // Random delay between 400-1200ms

      return () => clearInterval(interval);
    }
  }, [currentPhase]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (currentPhase === 'prompt') {
        const key = event.key.toLowerCase();
        if (key === 'y') {
          setUserInput('Y');
          setTimeout(() => {
            setCurrentPhase('fullscreen');
            if (onFullScreen) {
              onFullScreen(true);
            }
            // Start matrix effect after entering fullscreen
            setTimeout(() => {
              startMatrixEffect();
            }, 100);
          }, 500);
        } else if (key === 'n') {
          setUserInput('N');
          setTimeout(() => {
            // Reset terminal
            setCurrentPhase('loading');
            setLoadingText('');
            setShowPrompt(false);
            setUserInput('');
          }, 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPhase, onFullScreen]);

  const handleCodeEdit = (lineIndex, newValue) => {
    // This would be where users can "edit" the code
    console.log(`Line ${lineIndex} changed to: ${newValue}`);
  };

  const startMatrixEffect = () => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillStyle = i % 3 === 0 ? '#00FF00' : '#008F11';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    
    // Clean up interval when component unmounts or exits fullscreen
    return () => clearInterval(interval);
  };

  if (currentPhase === 'fullscreen') {
    return (
      <div className={styles.fullscreenTerminal}>
        <canvas 
          ref={matrixCanvasRef}
          className={styles.matrixCanvas}
        />
        <div className={styles.matrixOverlay}>
          <div className={styles.matrixHeader}>
            <span className={styles.hackingIndicator}>🔴 MATRIX BREACH INITIATED</span>
            <span className={styles.terminalPath}>ACCESSING MAINFRAME...</span>
          </div>
          <button 
            className={styles.exitButton}
            onClick={() => {
              setCurrentPhase('loading');
              setLoadingText('');
              setShowPrompt(false);
              setUserInput('');
              if (onFullScreen) {
                onFullScreen(false);
              }
            }}
          >
            ✕ EXIT MATRIX
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.terminal} ref={terminalRef}>
      <div className={styles.terminalContent}>
        <div className={styles.terminalOutput}>
          <div className={styles.welcomeText}>
            Last login: {new Date().toLocaleString()} on console
          </div>
          <pre className={styles.loadingOutput}>{loadingText}</pre>
          
          {showPrompt && (
            <div className={styles.promptSection}>
              <div className={styles.warningText}>
                ⚠️  WARNING: Unauthorized access detected!
              </div>
              <div className={styles.promptText}>
                Would you like to execute the exploitation script? (Y/N): 
                <span className={styles.userInput}>{userInput}</span>
                <span className={styles.cursor}>█</span>
              </div>
              <div className={styles.helpText}>
                Press 'Y' to proceed or 'N' to abort mission
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;