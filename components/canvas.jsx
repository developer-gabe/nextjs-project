import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  
  const [mode, setMode] = useState('draw');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);
  const [brushColor, setBrushColor] = useState('#ff6b6b');

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#ffeaa7', '#dda0dd', '#ff9ff3', '#a8e6cf'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize canvas
    const initCanvas = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = 450;
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    initCanvas();
    
    // Handle resize
    const handleResize = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 450;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);

    // Get mouse position
    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Drawing functions
    const startDrawing = (e) => {
      if (mode === 'draw') {
        setIsDrawing(true);
        const pos = getMousePos(e);
        draw(pos.x, pos.y);
      } else if (mode === 'particles') {
        const pos = getMousePos(e);
        createParticles(pos.x, pos.y);
      }
    };

    const draw = (x, y) => {
      if (!isDrawing || mode !== 'draw') return;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fillStyle = brushColor;
      ctx.fill();
    };

    const drawMove = (e) => {
      if (mode === 'draw' && isDrawing) {
        const pos = getMousePos(e);
        draw(pos.x, pos.y);
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    // Particle system
    const createParticles = (x, y) => {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (mode === 'particles' || mode === 'generative') {
        // Light fade for trails
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update particles
        ctx.globalCompositeOperation = 'screen';
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= particle.decay;
          particle.vx *= 0.98;
          particle.vy *= 0.98;
          
          if (particle.life > 0) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
            ctx.fill();
            return true;
          }
          return false;
        });
        
        // Generative mode auto-creates particles
        if (mode === 'generative' && Math.random() < 0.1) {
          createParticles(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation for particle modes
    if (mode === 'particles' || mode === 'generative') {
      animate();
    }

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', drawMove);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    const getTouchPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    };

    const touchStart = (e) => {
      e.preventDefault();
      if (mode === 'draw') {
        setIsDrawing(true);
        const pos = getTouchPos(e);
        draw(pos.x, pos.y);
      } else if (mode === 'particles') {
        const pos = getTouchPos(e);
        createParticles(pos.x, pos.y);
      }
    };

    const touchMove = (e) => {
      e.preventDefault();
      if (mode === 'draw' && isDrawing) {
        const pos = getTouchPos(e);
        draw(pos.x, pos.y);
      }
    };

    const touchEnd = (e) => {
      e.preventDefault();
      setIsDrawing(false);
    };

    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchmove', touchMove);
    canvas.addEventListener('touchend', touchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', drawMove);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', touchStart);
      canvas.removeEventListener('touchmove', touchMove);
      canvas.removeEventListener('touchend', touchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, isDrawing, brushSize, brushColor]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = [];
  };

  return (
    <div className="canvas-container">
      {/* Controls */}
      <div className="canvas-controls">
        <div className="control-group">
          <label>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="draw">Draw</option>
            <option value="particles">Particles</option>
            <option value="generative">Generative</option>
          </select>
        </div>
        
        {mode === 'draw' && (
          <>
            <div className="control-group">
              <label>Brush Size:</label>
              <input 
                type="range" 
                min="2" 
                max="25" 
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
              <span>{brushSize}px</span>
            </div>
            
            <div className="control-group">
              <label>Color:</label>
              <div className="color-palette">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${brushColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBrushColor(color)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        
        <button onClick={clearCanvas} className="clear-btn">
          Clear Canvas
        </button>
      </div>
      
      {/* Canvas */}
      <canvas 
        ref={canvasRef} 
        className="interactive-canvas"
      />
      
      {/* Instructions */}
      <div className="canvas-instructions">
        {mode === 'draw' && <p>Click and drag to draw • Touch supported</p>}
        {mode === 'particles' && <p>Click anywhere to create particle bursts</p>}
        {mode === 'generative' && <p>Watch the generative art unfold automatically</p>}
      </div>
    </div>
  );
};

export default Canvas;
