import Link from 'next/link';
import React, { Component } from 'react';

class Header extends Component {

	constructor(props) { 
		super(props);
		this.state = {
			navItems: [
				['Home', '/'],
				['Photography', '/photography'],
			],
		};
	}


	render() {
    const navItems = this.state.navItems;

    return (
      <header className="header">
        <nav className="header__nav">
					<Link href="/">
						<img src="/images/logo.png" alt="logo" className="header__logo" />
					</Link>
          {navItems.map((navItem) => (
            <Link href={navItem[1]} key={navItem[0]}>
              <span className="header__nav-item">{navItem[0]}</span>
            </Link>
          ))}
        </nav>
				<style jsx global>{`
				.header__nav {
					padding: 1rem 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.header__nav a {
					margin: 1rem;
					font-family: 'Roboto', sans-serif;
					text-decoration: none;
					font-size: 1.25rem;
					font-weight: 300;
					letter-spacing: 1.5px;
					color: #16363a;
				}

				.header__nav-item {
					transition: color ease-in-out 0.2s;
				}

				.header__nav-item:hover { 
					color: #D7A08B;
				}

				.header__logo {
					height: 50px;
				}
      `}</style>
      </header>
    );
  }
}

export default Header;



