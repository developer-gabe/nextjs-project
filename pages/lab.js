import React from 'react';
import { useState } from 'react';
import CodeCanvas from '../components/codeCanvas';

export default function Lab() {

	return (
    <main className='Lab'>
			<h1>Labs</h1>
			<p>Below is an attempt at recreating a CodePen like experience</p>
			<CodeCanvas />
    </main>
  )
}