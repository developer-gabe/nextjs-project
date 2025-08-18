import React, { Component } from 'react';
import Image from 'next/image';

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

				<div className="bio__text">
					<h1>{this.state.name}</h1>
					<p>{this.state.title}</p>
					<p>{this.state.bio}</p>
				</div>
				<style>
					{`
						.bio {
							margin: 0;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							gap: 1.5rem;
						}

						.bio__image {
							position: relative;
							width: 120px;
							height: 120px;
							overflow: hidden;
						}

						.profile-image {
							object-fit: cover;
						}

						.bio__text {
							text-align: left;
						}

						.bio__text h1 {
							margin-bottom: 0.5rem;
							font-size: 1.2rem;
						}

						.bio__text p {
							margin-top: 0;
							margin-bottom: 0.75rem;
							font-size: 0.9rem;
							line-height: 1.5;
						}

						/* Mobile styles */
						@media (max-width: 768px) {
							.bio__text h1 {
								font-size: 1.1rem;
							}

							.bio__text p {
								font-size: 0.85rem;
							}

							.bio__image {
								width: 100px;
								height: 100px;
							}
						}
						`}
				</style>
			</div>
		);
	}
}

export default Bio;