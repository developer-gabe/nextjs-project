import React, { Component } from 'react';

class Bio extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			name: "Gabe Araujo Sousa",
			title: "Front-End Developer",
			bio: "These bespectacled eyes see things. These trap-beat loving ears hear things. This Brazilian born, beach-loving soul feels things - and I use it all to help create some ill things.",
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
					<h1>{this.state.name}</h1>
					<p>{this.state.title}</p>
					<p>{this.state.bio}</p>
				</div>
				<style>
					{`
						.bio-image { 
							max-width: 220px;
						}

						.bio {
							display: grid;
							grid-template-columns: 1fr 4fr;
							grid-column-gap: 2rem;
							align-items: center;
							margin: 1rem auto;
						}

						.bio__text h1 {
							margin-bottom: 0;
						}

						.bio__text p {
							margin-top: 0;
						}


						/* Mobile styles */
						@media (max-width: 768px) {

								.bio__text h1 {
										font-size: 1.9rem; /* Smaller font size for mobile screens */
								}
						}

						`}
				</style>
			</div>
		);
	}
}

export default Bio;