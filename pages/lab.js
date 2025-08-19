import React from 'react';
import Link from 'next/link';
import MagazineHeader from '../components/MagazineHeader';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Lab({ allPostsData }) {
  // Define experiments with metadata
  const experiments = [
    {
      id: 'code-playground',
      title: 'Code Playground',
      description: 'A CodePen-like experience for writing and testing HTML, CSS, and JavaScript in real-time.',
      category: 'Development Tools',
      status: 'Active',
      link: '/lab/code-playground',
      preview: '💻',
      tags: ['HTML', 'CSS', 'JavaScript', 'Live Preview']
    },
    {
      id: 'fluid-navigation',
      title: 'Fluid Navigation',
      description: 'Interactive navigation with customizable gradient presets and smooth sliding indicator animation.',
      category: 'CSS Animations',
      status: 'Active',
      link: '/lab/lava-lamp',
      preview: '🌊',
      tags: ['CSS', 'Animation', 'Navigation', 'Gradient']
    },
    {
      id: 'media-player',
      title: 'Custom Media Player',
      description: 'A beautifully designed audio player with custom controls and visualizations.',
      category: 'UI Components',
      status: 'Active',
      link: '/lab/media-player',
      preview: '🎵',
      tags: ['Audio', 'UI', 'Controls', 'Design']
    },
    {
      id: 'canvas-art',
      title: 'Canvas Experiments',
      description: 'Interactive canvas drawings and generative art experiments using HTML5 Canvas.',
      category: 'Creative Coding',
      status: 'Active',
      link: '/lab/canvas-art',
      preview: '🎨',
      tags: ['Canvas', 'Art', 'Interactive', 'Generative']
    },
    {
      id: 'weather-widget',
      title: 'Weather Widget',
      description: 'A clean, minimal weather display with location-based forecasts.',
      category: 'Widgets',
      status: 'Active',
      link: '/lab/weather',
      preview: '🌤️',
      tags: ['Weather', 'API', 'Location', 'Widget']
    },
    {
      id: 'carousel-gallery',
      title: 'Image Carousel',
      description: 'Smooth, responsive image carousel with touch support and elegant transitions.',
      category: 'UI Components',
      status: 'Active',
      link: '/lab/carousel',
      preview: '🖼️',
      tags: ['Images', 'Carousel', 'Touch', 'Responsive']
    }
  ];

  const categories = [...new Set(experiments.map(exp => exp.category))];

  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main lab-main'>
        <div className='lab-content'>
          <div className='lab-header'>
            <div className='lab-title-section'>
              <h1>Lab</h1>
              <p>A collection of experiments, demos, and creative coding projects</p>
            </div>
            <div className='lab-stats'>
              <div className='stat-item'>
                <span className='stat-number'>{experiments.length}</span>
                <span className='stat-label'>Experiments</span>
              </div>
              <div className='stat-item'>
                <span className='stat-number'>{categories.length}</span>
                <span className='stat-label'>Categories</span>
              </div>
              <div className='stat-item'>
                <span className='stat-number'>{experiments.filter(exp => exp.status === 'Active').length}</span>
                <span className='stat-label'>Active</span>
              </div>
            </div>
          </div>

          <div className='experiments-grid'>
            {experiments.map((experiment) => (
              <Link href={experiment.link} key={experiment.id} className='experiment-card'>
                <div className='experiment-preview'>
                  <span className='experiment-emoji'>{experiment.preview}</span>
                  <div className='experiment-status'>
                    <span className={`status-badge status-${experiment.status.toLowerCase()}`}>
                      {experiment.status}
                    </span>
                  </div>
                </div>
                <div className='experiment-content'>
                  <div className='experiment-meta'>
                    <span className='experiment-category'>{experiment.category}</span>
                  </div>
                  <h3 className='experiment-title'>{experiment.title}</h3>
                  <p className='experiment-description'>{experiment.description}</p>
                  <div className='experiment-tags'>
                    {experiment.tags.map((tag, index) => (
                      <span key={index} className='experiment-tag'>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className='experiment-footer'>
                  <span className='experiment-link-text'>
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className='lab-footer'>
            <div className='lab-footer-content'>
              <h3>More Coming Soon</h3>
              <p>This lab is constantly evolving. Check back regularly for new experiments and creative projects.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}