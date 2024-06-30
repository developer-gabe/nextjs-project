import React, { useRef, useEffect } from 'react';

const LavaLamp = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 350;
    let height = 250;

    // Set canvas size to full screen
    canvas.width = width;
    canvas.height = height;

    const colors = [ '#0c0920', '#15102f', '#8E2DE2', '#4A00E0', ];

    let colorIndex = 0;

    // Randomize the gradient start position
    let startX = Math.random() * width;
    let startY = Math.random() * height;

    // Randomize the gradient movement speed
    let dx = 1;
    let dy = 1;

    // Set up the gradient and draw on the canvas
    function drawGradient() {
      const gradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, width);
      const stopCount = colors.length + 1;
      const stopIncrement = 1 / (stopCount - 1);
      for (let i = 0; i < stopCount; i++) {
        const stop = i * stopIncrement;
        if (i === 0) {
          gradient.addColorStop(stop, colors[0]);
        } else if (i === stopCount - 1) {
          gradient.addColorStop(stop, colors[colors.length - 1]);
        } else {
          const index = i - 1;
          gradient.addColorStop(stop, colors[index]);
        }
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Animate the gradient movement
    function animate() {
      // Move the gradient position
      startX += dx;
      startY += dy;

      // Reverse direction when the gradient reaches an edge
      if (startX < 0 || startX > width) {
        dx = -dx;
      }
      if (startY < 0 || startY > height) {
        dy = -dy;
      }

      // Draw the gradient
      drawGradient();

      // Request animation frame for continuous animation
      requestAnimationFrame(animate);
    }

    // Begin the animation loop
    animate();

    // Clean up the animation loop on unmount
    return () => cancelAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default LavaLamp;
