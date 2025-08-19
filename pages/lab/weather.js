import React from 'react';
import Link from 'next/link';
import Weather from '../../components/weather';
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

export default function WeatherWidget({ allPostsData }) {
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Weather Widget</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>Widgets</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>🌤️ Weather Widget</h1>
            <p className='experiment-description'>
              A clean, minimal weather display with location-based forecasts. 
              Features real-time weather data, beautiful icons, and responsive design.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>Weather</span>
              <span className='experiment-tag'>API</span>
              <span className='experiment-tag'>Location</span>
              <span className='experiment-tag'>Widget</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Live Weather Widget</h2>
              <p>View current weather conditions and forecasts with this clean, responsive widget!</p>
            </div>
            
            <div className='demo-container weather-demo'>
              <Weather />
            </div>
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Real-time weather data</li>
                <li>Location-based forecasts</li>
                <li>Beautiful weather icons</li>
                <li>Temperature and conditions</li>
                <li>Responsive design</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Data Sources</h3>
              <ul>
                <li>Weather API integration</li>
                <li>Geolocation services</li>
                <li>Real-time updates</li>
                <li>Fallback location handling</li>
                <li>Error state management</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Design Elements</h3>
              <ul>
                <li>Clean, minimal interface</li>
                <li>Intuitive weather icons</li>
                <li>Readable typography</li>
                <li>Subtle animations</li>
                <li>Mobile-optimized layout</li>
              </ul>
            </div>
          </div>

          {/* Use Cases */}
          <div className='experiment-note'>
            <h3>Use Cases</h3>
            <p>
              Weather widgets are perfect for dashboards, personal websites, mobile apps, 
              and any application where users need quick access to current weather conditions. 
              This implementation focuses on clarity and usability while maintaining visual appeal.
            </p>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab/canvas-art' className='nav-button secondary'>
              ← Previous: Canvas Experiments
            </Link>
            <Link href='/lab/carousel' className='nav-button primary'>
              Next: Image Carousel →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}