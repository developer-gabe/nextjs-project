import React, { Component } from "react";

class PhotoGrid extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			photos: [
				"/images/gallery/DSC00331.jpg",
				"/images/gallery/DSC00075.jpg",
				"/images/gallery/tall.jpg",
				"/images/gallery/rmnp.jpg",
				"/images/gallery/DSC00838.jpg",
				"/images/gallery/DSC01000.jpg",
				"/images/gallery/DSC01586.jpg",
			],
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center"
	};
	}

render() {
const { photos, backgroundSize, backgroundRepeat, backgroundPosition } = this.state;

return (
	<div className="photo-grid__container">
		<div className="grid">
		{photos.map((photo) => (
			<div
				className="photo-grid__card"
				key={photo.id}
				style={{
					backgroundImage: `url(${photo})`,
					backgroundSize: backgroundSize,
					backgroundRepeat: backgroundRepeat,
					backgroundPosition: backgroundPosition,
				}}
				onClick={() => window.open(photo, "_blank")}
			></div>
		))}</div>
			<style jsx global>
				{`
				.grid { 
					display: grid;
					grid-template-columns:1fr 1fr 1fr;
					grid-gap: 30px;
					margin: 3rem auto;

				}
				.photo-grid__card {
					width: 300px;
					height: 300px; 
					background-color: #eee;
					background-size: cover;
					background-repeat: no-repeat;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
					transition: all 0.3s cubic-bezier(.25,.8,.25,1);
					justify-self: center;
				}

				.photo-grid__card:hover {
					transform: scale(1.1);
					box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0, 0, 0, 0.295);
				}

				.photo-grid__controls {
					display: block;
					text-align: center;
					margin: auto;
				}

				button {
					padding: .5rem 2rem;
					margin: auto;
					background: #d496b1;
					border: none;
					color: #fff;
					font-size: 2rem;
					margin: 0 .5rem;
					width: 100px;
					transition: all ease-in-out 250ms;
				}

				button:hover { 
					transform: scale(.9);
				}

				button:active {
					background: #ffcbe5;
				}

				@media (max-width: 975px) { 
					.grid {
						grid-template-columns: 1fr 1fr;
						margin: 1rem auto;
					}
				}

				@media (max-width: 675px) { 
					.grid {
						grid-template-columns: 1fr;
						grid-gap: 3px
					}

					.photo-grid__card {
						width: 100%;
						height: 500px;
					}
				}

				@media (hover: none) { 
					.photo-grid__card:hover { 
						transform: scale(1);
					}
				}
				`}
			</style>
		</div>
);
}

}

export default PhotoGrid;



