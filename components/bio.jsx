import React, { Component } from 'react';
import styles from '../styles/Bio.module.css';

class Bio extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			name: "Gabe Araujo Sousa",
			title: "Front-End Developer",
			bio: "These bespectacled eyes see things. These trap-beat loving ears hear things. This Brazilian born, beach-loving soul feels things - and I use it all to help create some ill things.",
			image: "/images/gabe.jpg",
			socialLinks: [
				{
					name: "GitHub",
					url: "https://github.com/developer-gabe",
					icon: (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
						</svg>
					)
				},
				{
					name: "LinkedIn", 
					url: "https://linkedin.com/in/gsous",
					icon: (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
							<rect x="2" y="9" width="4" height="12"></rect>
							<circle cx="4" cy="4" r="2"></circle>
						</svg>
					)
				},
				{
					name: "Instagram",
					url: "https://instagram.com/garauxo",
					icon: (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
						</svg>
					)
				},
				{
					name: "Email",
					url: "mailto:gsousa09@icloud.com",
					icon: (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
					)
				}
			]
		};
	}

	render() { 
		return (
			<div className={styles.container}>
				<div className={styles.aboutWindow}>
					<div className={styles.logoSection}>
						<img src={this.state.image} alt="Gabe" className={styles.profileImage}/>
					</div>
					
					<div className={styles.infoSection}>
						<h1 className={styles.mainTitle}>{this.state.name}</h1>
						<p className={styles.version}>{this.state.title}</p>
						
						<div className={styles.systemInfo}>
							<div className={styles.infoRow}>
								<span className={styles.infoLabel}>Experience:</span>
								<span className={styles.infoValue}>5+ years</span>
							</div>
							<div className={styles.infoRow}>
								<span className={styles.infoLabel}>Specialties:</span>
								<span className={styles.infoValue}>React, NextJS, JavaScript</span>
							</div>
							<div className={styles.infoRow}>
								<span className={styles.infoLabel}>Company:</span>
								<span className={styles.infoValue}>Invincible Stack LLC</span>
							</div>
						</div>
						
						<div className={styles.bioSection}>
							<p className={styles.bioText}>{this.state.bio}</p>
						</div>
						
						<div className={styles.socialSection}>
							<div className={styles.socialLinks}>
								{this.state.socialLinks.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target={link.name !== "Email" ? "_blank" : "_self"}
										rel={link.name !== "Email" ? "noopener noreferrer" : ""}
										className={styles.socialLink}
										title={link.name}
									>
										<span className={styles.socialIcon}>{link.icon}</span>
										<span className={styles.socialName}>{link.name}</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Bio;