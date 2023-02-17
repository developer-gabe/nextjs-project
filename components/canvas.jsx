import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
		
		canvas.width = width;
		canvas.height = height;

    // Update the canvas dimensions on window resize
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Create an array of particles
		const particles = [];
		if (width > 768) { 
			for (let i = 0; i < 200; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					radius: Math.random() * 3 + 2,
					color: "#FFFFFF",
					speed: {
						x: Math.random() * 2 - 1,
						y: Math.random() * 2 - 1,
					},
				});
			}
		} else {
			for (let i = 0; i < 50; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					radius: Math.random() * 3 + 2,
					color: "#FFFFFF",
					speed: {
						x: Math.random() * 2 - 1,
						y: Math.random() * 2 - 1,
					},
				});
			}
		}

    // Draw the particles and animate them
    function animate() {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Update the position of the particles
      particles.forEach((particle) => {
        particle.x += particle.speed.x;
        particle.y += particle.speed.y;

        // Bounce the particles off the walls of the canvas
        if (particle.x < particle.radius || particle.x > width - particle.radius) {
          particle.speed.x *= -1;
        }
        if (particle.y < particle.radius || particle.y > height - particle.radius) {
          particle.speed.y *= -1;
        }

        // Draw the particle on the canvas
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw lines between the particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#d7a08b";
            ctx.lineWidth = 1 - distance / 150;
            ctx.stroke();
          }
        }
      }

      // Call requestAnimationFrame to animate the next frame
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
