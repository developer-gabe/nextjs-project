import Link from 'next/link';
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [['Home', '/'], ['Photography', '/photography'], ['Lab', '/lab']],
      showMenu: false,
    };
  }

  render() {
    const navItems = this.state.navItems;

    return (
      <header className="header">
        <nav className="header__nav desktop">
          {navItems.map((navItem) => (
            <Link href={navItem[1]} key={navItem[0]}>
              <span className="header__nav-item">{navItem[0]}</span>
            </Link>
          ))}
        </nav>
        <style jsx global>{`
          .header__nav {
            padding: 1rem 0 0 0;
            display: flex;
            align-items: center;
            justify-content: right;
          }

          .header__nav a {
            margin: 1rem 1rem 1rem 0;
            font-family:  'Poppins';
            text-decoration: none;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
						color: #251f54;
						transition: all ease-in-out 0.2s;
          }

					.header__nav a:hover {
						opacity: 1;
						text-decoration: underline
					}

          .header__nav-item {
            transition: color ease-in-out 0.2s;
          }

          .header__logo {
            height: 100px;
          }

          .header__hamburger {
            position: absolute;
            top: 0;
            right: 0;
            padding: 1rem;
            font-size: 1.4rem;
            background: none;
            border: none;
            cursor: pointer;
          }

          .show {
            display: flex;
            flex-direction: column; 
						align-items: center;
						justify-content: center;
						}

						@media (max-width: 768px) { 

							.header {
								overflow: hidden;
							}

							.mobile {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								position: absolute;
								top: unset;
								left: 100%;
								transform: translate(0%, 0);
							}

						  .show {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								position: absolute;
								top: unset;
								left: 50%;
								transform: translate(-50%, 0);
								transition: all ease-out 250ms;
							}
						}

						@media (max-width: 768px) { 
				
						}


      `}</style>
      </header>
    );
  }
}

export default Header;



