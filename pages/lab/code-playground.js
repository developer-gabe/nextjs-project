import React from 'react';
import Link from 'next/link';
import CodeCanvas from '../../components/codeCanvas';
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

export default function CodePlayground({ allPostsData }) {
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main experiment-main'>
        <div className='experiment-content'>
          {/* Breadcrumb Navigation */}
          <nav className='experiment-breadcrumb'>
            <Link href='/lab' className='breadcrumb-link'>← Lab</Link>
            <span className='breadcrumb-separator'>/</span>
            <span className='breadcrumb-current'>Code Playground</span>
          </nav>

          {/* Experiment Header */}
          <div className='experiment-header'>
            <div className='experiment-meta'>
              <span className='experiment-category'>Development Tools</span>
              <span className='experiment-status active'>Active</span>
            </div>
            <h1 className='experiment-title'>💻 Code Playground</h1>
            <p className='experiment-description'>
              A CodePen-like experience for writing and testing HTML, CSS, and JavaScript in real-time. 
              Perfect for quick experiments, prototyping, and learning new techniques.
            </p>
            <div className='experiment-tags'>
              <span className='experiment-tag'>HTML</span>
              <span className='experiment-tag'>CSS</span>
              <span className='experiment-tag'>JavaScript</span>
              <span className='experiment-tag'>Live Preview</span>
            </div>
          </div>

          {/* Experiment Demo */}
          <div className='experiment-demo'>
            <div className='demo-header'>
              <h2>Interactive Demo</h2>
              <p>Try editing the code below and see the results update in real-time!</p>
            </div>
            
            <CodeCanvas />
          </div>

          {/* Experiment Info */}
          <div className='experiment-info'>
            <div className='info-section'>
              <h3>Features</h3>
              <ul>
                <li>Live HTML, CSS, and JavaScript editing</li>
                <li>Real-time preview updates</li>
                <li>Syntax highlighting</li>
                <li>Resizable panes</li>
                <li>Clean, minimal interface</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Use Cases</h3>
              <ul>
                <li>Quick code experiments</li>
                <li>Prototyping UI components</li>
                <li>Testing CSS animations</li>
                <li>Learning new JavaScript features</li>
                <li>Sharing code snippets</li>
              </ul>
            </div>

            <div className='info-section'>
              <h3>Technical Details</h3>
              <ul>
                <li>Built with React hooks</li>
                <li>Uses iframe for sandboxed execution</li>
                <li>Responsive design for all devices</li>
                <li>Local storage for code persistence</li>
                <li>Error handling and console output</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className='experiment-navigation'>
            <Link href='/lab' className='nav-button secondary'>
              ← Back to Lab
            </Link>
            <Link href='/lab/lava-lamp' className='nav-button primary'>
              Next: CSS Lava Lamp →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}