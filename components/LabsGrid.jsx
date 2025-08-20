import React, { useState } from 'react';
import { useWindows } from '../lib/WindowContext';
import CodeCanvas from './codeCanvas';
import LavaLamp from './lavalamp';
import Canvas from './canvas';
import Weather from './weather';

const LabsGrid = () => {
  const { openWindow } = useWindows();

  const experiments = [
    {
      id: 'code-canvas',
      title: 'Code Canvas',
      description: 'A CodePen-like live code editor with HTML, CSS, and JavaScript',
      icon: '💻',
      component: <CodeCanvas />,
      color: '#FF6B6B'
    },
    {
      id: 'lava-lamp',
      title: 'Lava Lamp',
      description: 'Animated gradient effect using HTML5 Canvas',
      icon: '🌈',
      component: <LavaLamp />,
      color: '#4ECDC4'
    },
    {
      id: 'star-field',
      title: 'Star Field',
      description: 'Animated starfield background with moving particles',
      icon: '⭐',
      component: <Canvas />,
      color: '#45B7D1'
    },
    {
      id: 'weather-api',
      title: 'Weather Widget',
      description: 'Live weather data integration using OpenWeatherMap API',
      icon: '🌤️',
      component: <Weather city="Denver" />,
      color: '#96CEB4'
    }
  ];

  const handleOpenExperiment = (experiment) => {
    const ExperimentWindow = () => (
      <div style={{ 
        padding: '20px', 
        height: '100%', 
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '15px'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '24px', 
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '28px' }}>{experiment.icon}</span>
            {experiment.title}
          </h2>
          <p style={{ 
            margin: '0', 
            color: '#666', 
            fontSize: '14px' 
          }}>
            {experiment.description}
          </p>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {experiment.component}
        </div>
      </div>
    );
    openWindow(<ExperimentWindow />, experiment.title);
  };

  return (
    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', color: '#333' }}>
        🧪 Labs & Experiments
      </h2>
      <p style={{ 
        margin: '0 0 30px 0', 
        color: '#666', 
        fontSize: '16px',
        lineHeight: '1.5'
      }}>
        Interactive experiments and creative coding projects. Click on any experiment to open it in a new window.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '100%'
      }}>
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            onClick={() => handleOpenExperiment(experiment)}
            style={{
              position: 'relative',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #f0f0f0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: '#fafafa',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = experiment.color;
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#f0f0f0';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
          >
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {experiment.icon}
            </div>
            
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              textAlign: 'center'
            }}>
              {experiment.title}
            </h3>
            
            <p style={{
              margin: '0',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.4',
              textAlign: 'center',
              flex: 1
            }}>
              {experiment.description}
            </p>
            
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: experiment.color,
              opacity: '0.7'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabsGrid;