import React from 'react';
import Link from 'next/link';
import Carousel from '../../components/carousel';
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

export default function CarouselDemo({ allPostsData }) {
  // Sample images for the carousel demo
  const sampleImages = [
    {
      src: '/images/gallery/DSC00331.jpg',
      alt: 'Desert Solitude',
      title: 'Desert Landscape'
    },
    {
      src: '/images/gallery/DSC00075.jpg',
      alt: 'Mountain Vista',
      title: 'Mountain View'
    },
    {
      src: '/images/gallery/tall.jpg',
      alt: 'Vertical Ascent',
      title: 'Vertical Landscape'
    },
    {
      src: '/images/gallery/rmnp.jpg',
      alt: 'Alpine Majesty',
      title: 'Alpine Scene'
    },
    {
      src: '/images/gallery/DSC00236.jpg',
      alt: 'Nature Scene',
      title: 'Natural Beauty'
    }
  ];

  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Image Carousel</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>UI Components</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>🖼️ Image Carousel</h1>
            <p className='experiment-description'>
              Smooth, responsive image carousel with touch support and elegant transitions. 
              Perfect for showcasing galleries, portfolios, or any collection of images.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>Images</span>
              <span className='experiment-tag'>Carousel</span>
              <span className='experiment-tag'>Touch</span>
              <span className='experiment-tag'>Responsive</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Interactive Carousel</h2>
              <p>Swipe, click, or use keyboard navigation to browse through the image collection!</p>
            </div>
            
            <div className='demo-container carousel-demo'>
              <Carousel images={sampleImages} />
            </div>
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Touch and swipe support</li>
                <li>Keyboard navigation (arrow keys)</li>
                <li>Smooth CSS transitions</li>
                <li>Responsive image sizing</li>
                <li>Navigation dots and arrows</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Interaction Methods</h3>
              <ul>
                <li>Click arrow buttons to navigate</li>
                <li>Swipe left/right on touch devices</li>
                <li>Use left/right arrow keys</li>
                <li>Click navigation dots</li>
                <li>Auto-play with pause on hover</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Technical Implementation</h3>
              <ul>
                <li>React hooks for state management</li>
                <li>CSS transforms for smooth sliding</li>
                <li>Touch event handling</li>
                <li>Responsive image optimization</li>
                <li>Accessibility features</li>
              </ul>
            </div>
          </div>

          {/* Usage Examples */}
          <div className='experiment-note'>
            <h3>Perfect For</h3>
            <p>
              Image carousels are essential UI components for photography portfolios, 
              product galleries, testimonials, hero sections, and any scenario where 
              you need to display multiple images in a compact, engaging format.
            </p>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab/weather' className='nav-button secondary'>
              ← Previous: Weather Widget
            </Link>
            <Link href='/lab' className='nav-button primary'>
              Back to Lab Index →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}