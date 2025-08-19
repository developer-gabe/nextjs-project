import React from 'react';
import Link from 'next/link';
import MediaPlayer from '../../components/MediaPlayer';
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

export default function MediaPlayerDemo({ allPostsData }) {
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Custom Media Player</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>UI Components</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>🎵 Custom Media Player</h1>
            <p className='experiment-description'>
              A beautifully designed audio player with custom controls and visualizations. 
              Features a clean interface with smooth animations and responsive design.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>Audio</span>
              <span className='experiment-tag'>UI</span>
              <span className='experiment-tag'>Controls</span>
              <span className='experiment-tag'>Design</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Interactive Demo</h2>
              <p>Click the play button to experience a custom-built audio player with volume control, repeat modes, and smooth interactions!</p>
            </div>
            
            <div className='demo-container media-player-demo'>
              <MediaPlayer isVisible={true} onClose={() => {}} showCloseButton={false} demoMode={true} />
            </div>
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Custom-styled audio controls</li>
                <li>Smooth progress bar interactions</li>
                <li>Volume slider with visual feedback</li>
                <li>Repeat modes (off, repeat one, repeat all)</li>
                <li>Play/pause with animated icons</li>
                <li>Dynamic volume icons based on level</li>
                <li>Time display and track information</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Design Principles</h3>
              <ul>
                <li>Clean, minimal interface</li>
                <li>Consistent visual hierarchy</li>
                <li>Smooth micro-interactions</li>
                <li>Accessible controls</li>
                <li>Mobile-friendly design</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Technical Implementation</h3>
              <ul>
                <li>HTML5 Audio API integration</li>
                <li>React hooks for state management</li>
                <li>Volume state management with useEffect</li>
                <li>Repeat mode state handling</li>
                <li>CSS animations and transitions</li>
                <li>Custom SVG icons with dynamic states</li>
                <li>Custom range slider styling</li>
                <li>Responsive layout system</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab/lava-lamp' className='nav-button secondary'>
              ← Previous: CSS Lava Lamp
            </Link>
            <Link href='/lab/canvas-art' className='nav-button primary'>
              Next: Canvas Experiments →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}