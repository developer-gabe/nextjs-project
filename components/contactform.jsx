import React, { Component } from "react";

class ContactForm extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			name: "",
			message: "",
			messages: [
				{message: "Howdy", name: "Arthur Morgan"},
			]
		}
	}
	
handleSubmit = async e => {
	e.preventDefault();
			
		// Let's add the name and message to the messages array
		const newMessage = {
			name: this.state.name,
			message: this.state.message
		};

		if (newMessage.name === "" || newMessage.message === "") return;
		
		this.setState({ messages: [...this.state.messages, newMessage] });
	};

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
				<div className="comment-section">
				{this.state.messages.map((message, index) => (
					<div className="comment" key={index}>
						<h3>{message.name}</h3>
						<p>{message.message}</p>
					</div>
				))}
				</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
				<style jsx global>{`

					.contact-me {
						max-width: 400px;
						margin: auto;
						text-align: center;
					}

					.delete-btn {
						position: absolute;
					}

						form {
							display: grid;
						}

						form input, form textarea {
							max-width: 500px;
							margin: .5rem 0;
							border: none;
							background-color: #eee;
						}

						form input {
							padding: .5rem .2rem;
						}

						form textarea { 
							padding: 2rem .2rem;
						}

						button {
							padding: .5rem 2rem;
							margin: auto;
							background: #d496b1;
							border: none;
							color: #fff;
							font-size: 1.5rem;
							margin: 0 .5rem;
							transition: all ease-in-out 150ms;
						}

						button:hover { 
							transform: scale(.9);
						}

						button:active {
							background: #ffcbe5;
						}
						
						.comment { 
							position: relative;
							margin: 1rem;
							padding: 2rem;
							box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
						}
      `}</style>
      </div>
    );
  }
	
}

export default ContactForm;