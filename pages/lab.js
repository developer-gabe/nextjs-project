import React from 'react';
import { useState } from 'react';
import CodeCanvas from '../components/codeCanvas';
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
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main lab-main'>
        <div className='lab-content'>
          <div className='lab-header'>
            <h1>Lab</h1>
            <p>Experiments and interactive demos</p>
          </div>
          
          <div className='lab-section'>
            <h2>Code Playground</h2>
            <p>An attempt at recreating a CodePen-like experience</p>
            <CodeCanvas />
          </div>
        </div>
      </main>
    </div>
  );
}