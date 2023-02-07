import React, { Component } from "react";

class PhotoGrid extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			photos: [],
			cardWidth: 300,
			cardHeight: 300,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			startIndex: 0,
			endIndex: 3,
	};
	}

render() {
const { photos, cardWidth, cardHeight, backgroundSize, backgroundRepeat, backgroundPosition, startIndex, endIndex } = this.state;

return (
	<div className="photo-grid__container">
		<div className="photo-grid__controls">
			<button onClick={() => this.setState({ endIndex: endIndex + 1 })}>+</button>
			<button onClick={() => this.setState({ endIndex: endIndex - 1 })}>-</button>
		</div>
		<div className="grid">
		{photos.slice(startIndex, endIndex).map((photo) => (
			<div
				className="photo-grid__card"
				key={photo.id}
				style={{
					width: `${cardWidth}px`,
					height: `${cardHeight}px`,
					backgroundImage: `url(${photo.urls.regular})`,
					backgroundSize: backgroundSize,
					backgroundRepeat: backgroundRepeat,
					backgroundPosition: backgroundPosition,
				}}
				onClick={() => window.open(photo.urls.regular, "_blank")}
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
					width: 250px;
					height: 250px; 
					background-color: #eee;
					background-size: cover;
					background-repeat: no-repeat;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
					transition: all 0.3s cubic-bezier(.25,.8,.25,1);
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

				@media (max-width: 768px) { 
					.grid {
						grid-template-columns: 1fr;
						margin: auto;
					}
				}
				`}
			</style>
		</div>
);
}

//When the component mounts lets grab the data from the API
componentDidMount() {

	//FetchData is an asyncrounous function that will be grabbing the data from the API
	const fetchData = async () => {
		//Fetch the data from the API
		const response = await fetch("https://api.unsplash.com/photos?client_id=3hQo3FEZqCxsjedEFlBurRdCn1BDiYlOsj_99WBwEDU&per_page=18");
		//Turn data into JSON
		const data = await response.json();
		//Set the state to our data
		this.setState({ photos: data });
	};

	fetchData();
}

}

export default PhotoGrid;



