import React, { useRef, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let requestId;

    // Set canvas dimensions to match window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];

		if (canvas.width < 768) { 
			// Generate stars
			for (let i = 0; i < 50; i++) {
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				const radius = Math.random() * 1.5;
				const speed = Math.random() * 0.05 + 0.05;
				stars.push({ x, y, radius, speed });
			}

		} else {
			    // Generate stars
					for (let i = 0; i < 100; i++) {
						const x = Math.random() * canvas.width;
						const y = Math.random() * canvas.height;
						const radius = Math.random() * 1.5;
						const speed = Math.random() * 0.05 + 0.05;
						stars.push({ x, y, radius, speed });
					}

		}


    const drawBackground = (x, y, radius) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'purple');
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const radius = Math.min(canvas.width, canvas.height) * 1.5;
      const x = canvas.width - radius;
      const y = canvas.height - radius;
      drawBackground(x, y, radius);

      // Draw stars
      stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      requestId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Canvas;
