import React, { Component } from 'react';

class Bio extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			name: "Gabe Sousa",
			title: "Front-End Developer @ Abnormal Security",
			bio: "I tried the college thing, but it wasn't for me so I taught myself web development, and developed a particular passion for the front-end. Why? Because these bespectacled eyes see things. These trap-beat loving ears hear things. This Brazilian born, mountain loving soul feels things - and I turn it all into immersive digital art",
			image: "/images/gabe.jpg",
		};
	}

	render() { 
		return (
			<div className="bio">
				<div className="bio__image">
					<img src={this.state.image} alt="Gabe" className='bio-image'/>
				</div>
				<div className="bio__text">
					<h1>Gabe Sousa</h1>
					<p>{this.state.title}</p>
					<p>{this.state.bio}</p>
				</div>
				<style>
					{`
						.bio-image { 
							max-width: 220px;
							border-radius: 26px;
						}

						.bio {
							display: grid;
							grid-template-columns: 1fr 4fr;
							grid-column-gap: 2rem;
							align-items: last baseline;
							margin: 1rem auto;
						}

						.bio__text h1 {
							margin-bottom: 0;
						}

						.bio__text p {
							margin-top: 0;
						}

						`}
				</style>
			</div>
		);
	}
}

export default Bio;