import React, { useState, useRef, useEffect } from 'react';

const FluidNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [selectedGradient, setSelectedGradient] = useState('default');
  const navRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ];

  const gradientPresets = {
    default: {
      name: 'Rainbow Flow',
      gradient: 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff9ff3)',
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#ff9ff3']
    },
    darkOcean: {
      name: 'Dark Ocean',
      gradient: 'linear-gradient(-45deg, #373B44, #4286f4)',
      colors: ['#373B44', '#4286f4']
    },
    coolBlues: {
      name: 'Cool Blues',
      gradient: 'linear-gradient(-45deg, #2193b0, #6dd5ed)',
      colors: ['#2193b0', '#6dd5ed']
    },
    moonPurple: {
      name: 'Moon Purple',
      gradient: 'linear-gradient(-45deg, #4e54c8, #8f94fb)',
      colors: ['#4e54c8', '#8f94fb']
    },
    sunset: {
      name: 'Sunset',
      gradient: 'linear-gradient(-45deg, #ff7e5f, #feb47b)',
      colors: ['#ff7e5f', '#feb47b']
    }
  };

  useEffect(() => {
    updateIndicator(0);
  }, []);

  const updateIndicator = (index) => {
    if (navRef.current) {
      const activeItem = navRef.current.children[index];
      if (activeItem) {
        setIndicatorStyle({
          width: `${activeItem.offsetWidth}px`,
          transform: `translateX(${activeItem.offsetLeft}px)`,
        });
      }
    }
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    updateIndicator(index);
  };

  const handleMouseLeave = () => {
    updateIndicator(activeIndex);
  };

  const handleClick = (index, e) => {
    e.preventDefault();
    setActiveIndex(index);
    updateIndicator(index);
  };

  const handleGradientChange = (gradientKey) => {
    setSelectedGradient(gradientKey);
  };

  return (
    <div className="fluid-nav-container">
      <nav 
        className="fluid-nav" 
        ref={navRef}
      >
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`fluid-nav-item ${index === activeIndex ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(index, e)}
          >
            {item.label}
          </a>
        ))}
        <div 
          className="fluid-nav-indicator"
          style={indicatorStyle}
        />
      </nav>
      
      {/* Gradient Picker */}
      <div className="gradient-picker">
        <h3>Choose a Gradient:</h3>
        <div className="gradient-options">
          {Object.entries(gradientPresets).map(([key, preset]) => (
            <button
              key={key}
              className={`gradient-option ${selectedGradient === key ? 'active' : ''}`}
              onClick={() => handleGradientChange(key)}
              style={{ background: preset.gradient }}
              title={preset.name}
            >
              <span className="gradient-name">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fluid-nav-description">
        <p>Interactive navigation with a flowing gradient indicator!</p>
        <p>Choose a gradient preset above, then hover over the menu items to see the smooth sliding animation.</p>
      </div>

      <style jsx>{`
        .fluid-nav-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .fluid-nav {
          position: relative;
          display: flex;
          background: #f8f9fa;
          border-radius: 50px;
          padding: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
        }

        .fluid-nav-item {
          position: relative;
          padding: 12px 24px;
          text-decoration: none;
          color: #6c757d;
          font-weight: 500;
          font-size: 0.9rem;
          border-radius: 25px;
          transition: color 0.3s ease;
          z-index: 2;
          white-space: nowrap;
        }

        .fluid-nav-item:hover,
        .fluid-nav-item.active {
          color: #ffffff;
        }

        .fluid-nav-indicator {
          position: absolute;
          top: 8px;
          left: 8px;
          height: calc(100% - 16px);
          background: ${gradientPresets[selectedGradient].gradient};
          background-size: 400% 400%;
          border-radius: 25px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          box-shadow: 0 4px 20px rgba(${gradientPresets[selectedGradient].colors[0].replace('#', '')
            .match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4);
          animation: fluidFlow 4s ease-in-out infinite;
        }

        @keyframes fluidFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Gradient Picker Styles */
        .gradient-picker {
          text-align: center;
          margin: 1rem 0;
        }

        .gradient-picker h3 {
          margin-bottom: 1rem;
          color: #495057;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .gradient-options {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .gradient-option {
          position: relative;
          width: 80px;
          height: 40px;
          border: 2px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          background-size: 200% 200%;
          animation: gradientPreview 3s ease-in-out infinite;
        }

        .gradient-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .gradient-option.active {
          border-color: #495057;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .gradient-name {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          color: #6c757d;
          white-space: nowrap;
          font-weight: 500;
        }

        .gradient-option.active .gradient-name {
          color: #495057;
          font-weight: 600;
        }

        @keyframes gradientPreview {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .fluid-nav-description {
          text-align: center;
          max-width: 500px;
          margin-top: 2rem;
        }

        .fluid-nav-description p {
          margin: 0.5rem 0;
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .fluid-nav {
            flex-wrap: wrap;
            justify-content: center;
            padding: 6px;
          }
          
          .fluid-nav-item {
            padding: 10px 18px;
            font-size: 0.85rem;
          }
          
          .fluid-nav-container {
            padding: 1rem;
          }

          .gradient-options {
            gap: 0.5rem;
          }

          .gradient-option {
            width: 70px;
            height: 35px;
          }

          .gradient-picker h3 {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .fluid-nav {
            flex-direction: column;
            border-radius: 12px;
            width: 100%;
            max-width: 250px;
          }
          
          .fluid-nav-item {
            padding: 12px 20px;
            text-align: center;
            border-radius: 8px;
          }
          
          .fluid-nav-indicator {
            border-radius: 8px;
          }

          .gradient-options {
            gap: 0.4rem;
          }

          .gradient-option {
            width: 60px;
            height: 30px;
          }

          .gradient-name {
            font-size: 0.65rem;
            bottom: -22px;
          }

          .gradient-picker h3 {
            font-size: 0.95rem;
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FluidNavigation;
