import React, { Component } from "react";

class Bio extends Component {

		static defaultProps = {
			userName: "FirstName LastName",
			userImage: "/images/gabe.jpg",
			userTitle: "Title",
			userBio: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		};

		render() {
				return (
						<div className="bio-grid">
							<div className="bio-image" style={{ backgroundImage: `url(${this.props.userImage})` }}> 
							</div>
							<div className="bio-info">
								<h1>{this.props.userName}</h1>
								<h2>{this.props.userTitle}</h2>
								<p>{this.props.userBio}</p>
							</div>
						
								<style jsx global>{`
										img {
											max-width: 250px
										}

										.bio-grid {
											display: grid;
											grid-template-columns: 1fr 1fr;
											align-items: center;
											height: 500px;
											background-color: #16363a;
											box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0, 0, 0, 0.295);
										}

										.bio-info {
											font-family: 'Roboto', sans-serif;
											padding: 1rem;
										}

										.bio-info h1 {
											font-size: 2rem;
											color: #D7A08B;
											margin-bottom: .35rem;
											text-transform: uppercase;
										}

										.bio-info h2 {
											margin-top: 0;
											margin-left: .15rem;
											margin: 0 .15rem 1rem .15rem;
											font-size: .9rem;
											color: #fff;
											font-weight: 300;
											text-transform: uppercase;
											letter-spacing: 2px;
										}

										.bio-info p {
											color: #D7A08B;
											line-height: 2;
										}

										.bio-image {
											background-size: cover;
											background-position: center;
											height: 100%;
										}

										@media (max-width: 768px) { 
										.bio-grid {
												grid-template-columns: 1fr;
												height: 100%;
											}

										.bio-image {
											height: 450px;
											background-position: center;
										}
										}
    
							`}</style>
						</div>
				)
		}

}

export default Bio;