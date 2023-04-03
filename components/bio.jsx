import React, { Component } from 'react';

class Bio extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			name: "Gabe Sousa",
			title: "Front-End Developer @ Abnormal Security",
			bio: "These bespectacled eyes see things. These trap-beat loving ears hear things. This Brazilian born, mountain loving soul feels things - and I use it all to help create some ill things",
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
							align-items: center;
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