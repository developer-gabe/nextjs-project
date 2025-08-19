import React from 'react';
import Link from 'next/link';
import FluidNavigation from '../../components/lavalamp';
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

export default function FluidNavigationDemo({ allPostsData }) {
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Fluid Navigation</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>CSS Animations</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>🌊 Fluid Navigation</h1>
            <p className='experiment-description'>
              An interactive navigation component with a smooth sliding indicator and customizable flowing gradient animation. 
              Choose from multiple gradient presets and watch the colorful background flow as the indicator smoothly transitions between menu items.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>CSS</span>
              <span className='experiment-tag'>Animation</span>
              <span className='experiment-tag'>Navigation</span>
              <span className='experiment-tag'>Gradient</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Interactive Demo</h2>
              <p>Choose a gradient preset and hover over the navigation items to see the fluid animation in action!</p>
            </div>
            
            <div className='demo-container'>
              <FluidNavigation />
            </div>
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Smooth sliding indicator animation</li>
                <li>Multiple gradient preset options</li>
                <li>Continuously flowing gradient background</li>
                <li>Responsive hover interactions</li>
                <li>Hardware-accelerated CSS animations</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Use Cases</h3>
              <ul>
                <li>Main website navigation</li>
                <li>Tab interfaces</li>
                <li>Button groups</li>
                <li>Menu systems</li>
                <li>Interactive dashboards</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Technical Details</h3>
              <ul>
                <li>CSS transforms for smooth position changes</li>
                <li>Gradient animations with background-position</li>
                <li>React state for active item tracking</li>
                <li>Hardware-accelerated animations</li>
                <li>Responsive design with media queries</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab/code-playground' className='nav-button secondary'>
              ← Previous: Code Playground
            </Link>
            <Link href='/lab/media-player' className='nav-button primary'>
              Next: Media Player →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}