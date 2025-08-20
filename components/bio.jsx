import React, { Component } from 'react';

class Bio extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			name: "Gabe Araujo Sousa",
			title: "Front-End Developer @ Abnormal Security",
			bio: "These bespectacled eyes see things. These trap-beat loving ears hear things. This Brazilian born, mountain loving soul feels things - and I use it all to help create some ill things",
			image: "/images/gabe.jpg",
			socialLinks: [
				{
					name: "GitHub",
					url: "https://github.com/developer-gabe",
					icon: "⚫"
				},
				{
					name: "LinkedIn", 
					url: "https://linkedin.com/in/gsous",
					icon: "⚫"
				},
				{
					name: "Instagram",
					url: "https://instagram.com/garauxo",
					icon: "⚫"
				},
				{
					name: "Email",
					url: "mailto:gsousa09@icloud.com",
					icon: "⚫"
				}
			]
		};
	}

	render() { 
		return (
			<div className="bio-container">
				<div className="bio-card">
					<div className="bio__image">
						<img src={this.state.image} alt="Gabe" className='bio-image'/>
						<div className="image-overlay"></div>
					</div>
					<div className="bio__content">
						<div className="bio__text">
							<h1>{this.state.name}</h1>
							<p className="bio__title">{this.state.title}</p>
							<p className="bio__description">{this.state.bio}</p>
						</div>
						<div className="bio__social">
							<h3>Connect with me</h3>
							<div className="social-links">
								{this.state.socialLinks.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target={link.name !== "Email" ? "_blank" : "_self"}
										rel={link.name !== "Email" ? "noopener noreferrer" : ""}
										className="social-link"
										title={link.name}
									>
										<span className="social-icon">{link.icon}</span>
										<span className="social-name">{link.name}</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				<style>
					{`
						.bio-container {
							padding: 2rem;
							min-height: 400px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.bio-card {
							background: white;
							padding: 2rem;
							display: grid;
							grid-template-columns: 300px 1fr;
							grid-gap: 2rem;
							align-items: center;
							max-width: 800px;
							width: 100%;
						}

						.bio__image {
							border: 2px solid #000;
							overflow: hidden;
						}

						.bio-image { 
							width: 100%;
							height: auto;
							display: block;
							border: none;
						}

						.image-overlay {
							display: none;
						}

						.bio__content {
							color: #000;
						}

						.bio__text h1 {
							font-size: 2.5rem;
							margin-bottom: 0.5rem;
							color: #000;
							font-weight: 700;
						}

						.bio__title {
							font-size: 1.1rem;
							color: #666;
							margin-bottom: 1rem;
							font-weight: 500;
							text-transform: uppercase;
							letter-spacing: 1px;
						}

						.bio__description {
							font-size: 1rem;
							line-height: 1.6;
							color: #333;
							margin-bottom: 2rem;
						}

						.bio__social h3 {
							color: #000;
							margin-bottom: 1rem;
							font-size: 1.2rem;
							font-weight: 600;
						}

						.social-links {
							display: flex;
							gap: 1rem;
							flex-wrap: wrap;
						}

						.social-link {
							display: flex;
							align-items: center;
							gap: 0.5rem;
							padding: 0.75rem 1rem;
							background: white;
							border: 2px solid #000;
							color: #000;
							text-decoration: none;
							transition: all 0.2s ease;
							font-weight: 500;
						}

						.social-link:hover {
							background: #000;
							color: white;
						}

						.social-icon {
							font-size: 1rem;
						}

						.social-name {
							font-size: 0.9rem;
							font-weight: 500;
						}

						/* Mobile styles */
						@media (max-width: 768px) {
							.bio-container {
								padding: 1rem;
							}

							.bio-card {
								grid-template-columns: 1fr;
								padding: 1.5rem;
								text-align: center;
							}

							.bio__text h1 {
								font-size: 2rem;
							}

							.bio__title {
								font-size: 1rem;
							}

							.bio__description {
								font-size: 0.9rem;
								margin-bottom: 1.5rem;
							}

							.social-links {
								justify-content: center;
								gap: 0.75rem;
							}

							.social-link {
								padding: 0.6rem 0.8rem;
								font-size: 0.8rem;
							}

							.social-icon {
								font-size: 0.9rem;
							}
						}

						@media (max-width: 480px) {
							.social-links {
								flex-direction: column;
								align-items: center;
							}

							.social-link {
								width: 200px;
								justify-content: center;
							}
						}

						`}
				</style>
			</div>
		);
	}
}

export default Bio;