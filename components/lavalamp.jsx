import React, { useRef, useEffect, useState } from 'react';
import styles from '../styles/MusicVisualizer.module.css';

const MusicVisualizer = () => {
  const canvasRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [isPlaying, setIsPlaying] = useState(true);
  const [intensity, setIntensity] = useState(50);

  const themes = {
    cosmic: {
      name: 'Cosmic',
      colors: ['#0c0920', '#15102f', '#8E2DE2', '#4A00E0'],
      speed: 1
    },
    ocean: {
      name: 'Ocean',
      colors: ['#001a2e', '#003459', '#007ea7', '#00a8e8'],
      speed: 0.8
    },
    sunset: {
      name: 'Sunset',
      colors: ['#2d1b69', '#11998e', '#38ef7d', '#f093fb'],
      speed: 1.2
    },
    fire: {
      name: 'Fire',
      colors: ['#1a0000', '#ff0000', '#ff6600', '#ffaa00'],
      speed: 1.5
    },
    forest: {
      name: 'Forest',
      colors: ['#0d1b2a', '#415a77', '#778da9', '#e0e1dd'],
      speed: 0.7
    },
    neon: {
      name: 'Neon',
      colors: ['#000000', '#ff006e', '#8338ec', '#3a86ff'],
      speed: 2
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Resize canvas to full container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let particles = [];
    let time = 0;
    const theme = themes[currentTheme];

    // Create particles for visualization
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(intensity / 2) + 10;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * theme.speed,
          speedY: (Math.random() - 0.5) * theme.speed,
          hue: Math.random() * 360,
          life: Math.random() * 100
        });
      }
    };

    createParticles();

    // Main animation function
    const animate = () => {
      if (!isPlaying) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create dynamic gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );

      theme.colors.forEach((color, index) => {
        gradient.addColorStop(index / (theme.colors.length - 1), color + '40');
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX * (intensity / 50);
        particle.y += particle.speedY * (intensity / 50);
        particle.life -= 0.5;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset particle if life is over
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 100;
        }

        // Draw particle with glow effect
        const alpha = particle.life / 100;
        const size = particle.size * (intensity / 50) * alpha;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Create particle gradient
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 3
        );
        
        const colorIndex = Math.floor((particle.hue + time * 50) % theme.colors.length);
        const color = theme.colors[colorIndex];
        
        particleGradient.addColorStop(0, color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        particleGradient.addColorStop(1, color + '00');
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      // Draw frequency bars (simulated)
      const barCount = 64;
      const barWidth = canvas.width / barCount;
      
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.sin(time * 2 + i * 0.1) * (intensity / 2) + Math.random() * 20;
        const hue = (i * 5 + time * 50) % 360;
        
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.3)`;
        ctx.fillRect(
          i * barWidth,
          canvas.height - Math.abs(barHeight),
          barWidth - 1,
          Math.abs(barHeight)
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentTheme, isPlaying, intensity]);

  return (
    <div className={styles.visualizer}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Theme:</label>
          <select 
            value={currentTheme} 
            onChange={(e) => setCurrentTheme(e.target.value)}
            className={styles.themeSelect}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <option key={key} value={key}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Intensity:</label>
          <input
            type="range"
            min="10"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.sliderValue}>{intensity}%</span>
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`${styles.playButton} ${isPlaying ? styles.playing : styles.paused}`}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      <canvas 
        ref={canvasRef} 
        className={styles.canvas}
      />
    </div>
  );
};

export default MusicVisualizer;
