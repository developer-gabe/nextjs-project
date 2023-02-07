import React, { Component } from 'react';

class Weather extends Component { 

	constructor(props) { 
		super(props);
		this.state = { 
			weather: ""
		}
	}

	render() {
		return (
			<div className='component-weather'>
				<h1>Weather API</h1>
				<div className='weather-text'>Currently in Denver: <span>{this.state.weather}</span></div>
				<style jsx global>{`

					.component-weather { 
						display: block;
						max-width: 400px;
						background-color: #a3abb8;
						padding: 1.5rem;
						margin: auto;
					}

					.weather-text {
						font-size: 1.5rem;
						font-family: 'Roboto', sans-serif;
						font-weight: 300;
					}

					.weather-text span { 
						font-weight: 600;
					}

      `}</style>
			</div>
		);
	 }

	componentDidMount() {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&APPID=4aa499facc37108eb910cea5131c1ba3`)
		.then(response => response.json())
		.then (data => { 
			this.setState({ weather: data.weather[0].main });
		})
		.catch(error => {
			console.error(error);
		});
	}

}

export default Weather;
