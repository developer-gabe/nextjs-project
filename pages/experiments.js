import React from 'react';
import Weather from '../components/weather';



const Experiments = () => {
  return (
    <main className="experiments">
      <h1>Experiments Page</h1>
			<Weather city="Denver"/>
    </main>
  );
};

export default Experiments;