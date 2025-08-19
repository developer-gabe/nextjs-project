import React from 'react';
import Link from 'next/link';
import Canvas from '../../components/canvas';
import MagazineHeader from '../../components/MagazineHeader';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function CanvasArt({ allPostsData }) {
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Canvas Experiments</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>Creative Coding</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>🎨 Canvas Experiments</h1>
            <p className='experiment-description'>
              Interactive canvas drawings and generative art experiments using HTML5 Canvas. 
              Explore the intersection of code and creativity through dynamic visual experiences.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>Canvas</span>
              <span className='experiment-tag'>Art</span>
              <span className='experiment-tag'>Interactive</span>
              <span className='experiment-tag'>Generative</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Interactive Demo</h2>
              <p>Click, drag, or interact with the canvas below to create dynamic visual art!</p>
            </div>
            
            <div className='demo-container canvas-demo'>
              <Canvas />
            </div>
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Real-time drawing and interaction</li>
                <li>Mouse and touch event handling</li>
                <li>Dynamic color and brush systems</li>
                <li>Particle effects and animations</li>
                <li>Responsive canvas sizing</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Creative Possibilities</h3>
              <ul>
                <li>Generative art patterns</li>
                <li>Interactive visualizations</li>
                <li>Digital painting tools</li>
                <li>Animated backgrounds</li>
                <li>Data visualization</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Technical Aspects</h3>
              <ul>
                <li>HTML5 Canvas API</li>
                <li>2D rendering context</li>
                <li>Animation frame optimization</li>
                <li>Event-driven interactions</li>
                <li>Performance-conscious drawing</li>
              </ul>
            </div>
          </div>

          {/* Additional Info */}
          <div className='experiment-note'>
            <h3>About Creative Coding</h3>
            <p>
              Creative coding bridges the gap between technology and art, using programming as a medium 
              for artistic expression. The canvas element provides a powerful platform for creating 
              interactive visual experiences that respond to user input and generate unique patterns.
            </p>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab/media-player' className='nav-button secondary'>
              ← Previous: Media Player
            </Link>
            <Link href='/lab/weather' className='nav-button primary'>
              Next: Weather Widget →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}