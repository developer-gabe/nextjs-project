import React, { Component } from 'react';
import Image from 'next/image';


class PortfolioGrid extends Component {
	
	constructor (props) { 
		super(props);
		this.state = { 
			projects: [
				{
					id: 1,
					title: 'GuestQuest Insights',
					description: 'A full WordPress Build featuring a custom theme, custom blocks, and custom post types.',
					image: '/images/guestquest.png',
				},
				{
					id: 2,
					title: 'Teddie Peanbutter',
					description: 'A full WordPress Build featuring a custom theme, custom blocks, and custom post types.',
					image: 'project2.jpg',
				},
				{
					id: 3,
					title: 'SPA for Polo Ralph Lauren',
					description: 'An SPA built for Polo Ralph Laurens flagship store in NYC. Built with Vue.',
					image: 'project3.jpg',
				},
				{
					id: 4,
					title: 'Boston University - Questrom School of Business',
					description: 'A complete overhaul of their Business School website.',
					image: 'project4.jpg',
				},
				{
					id: 5,
					title: 'DCO Email Templates Zillow Group',
					description: 'A crazy experience...',
					image: 'project5.jpg',
				},
				{
					id: 6,
					title: 'Internal Intranet Project',
					description: 'A Intranet built using Vue and WordPress.',
					image: 'project6.jpg',
				},
			],
		}
	}

  render() {
    const { projects } = this.state;

    return (
      <div className="portfolio-grid">
        {projects.map((project) => (
          <div className="portfolio-grid__item" key={project.id}>
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
						<div className='portfolio-grid__item__overlay'>
							<h2>{project.title}</h2>
							<p>{project.description}</p>
						</div>
          </div>
        ))}

        <style jsx>
          {`
            .portfolio-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-gap: 1rem;
            }
            .portfolio-grid__item {
							height: 300px;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
							position: relative;
							background: rgba(0,0,0,0.0);
							transition: background ease-in-out 250ms;
							overflow: hidden;
            }
						.portfolio-grid__item__overlay {
							color: #fff;
							position: absolute;
							z-index: 1;
							opacity: 0;
							transition: opacity ease-in-out 250ms
						}

						.portfolio-grid__item:hover .portfolio-grid__item__overlay { 
							opacity: 1;
						}

						.portfolio-grid__item:hover {
							background: rgba(0,0,0,0.8);
						}


          `}
        </style>
      </div>
    );
  }
}

export default PortfolioGrid;