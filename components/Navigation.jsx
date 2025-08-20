import React, { useState } from "react";
import Link from "next/link";
import { useWindows } from '../lib/WindowContext';
import PhotoGrid from './photo-grid';

const Navigation = () => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showGoMenu, setShowGoMenu] = useState(false);
  const [bgColor, setBgColor] = useState("#fec8a0");
  const navItems = [['Home', '/'], ['Photography', '/photography'], ['Posts', '/posts']];
  const presetColors = ['#c9e8f0', '#ead9ed', '#f7c5c6'];
	const { openWindow } = useWindows(); 

  const handleMenuClick = (menu) => {
    switch (menu) {
      case "file":
        setShowFileMenu(!showFileMenu);
        setShowEditMenu(false);
        setShowViewMenu(false);
        setShowGoMenu(false);
        break;
      case "edit":
        setShowEditMenu(!showEditMenu);
        setShowFileMenu(false);
        setShowViewMenu(false);
        setShowGoMenu(false);
        break;
      case "view":
        setShowViewMenu(!showViewMenu);
        setShowFileMenu(false);
        setShowEditMenu(false);
        setShowGoMenu(false);
        break;
      case "go":
        setShowGoMenu(!showGoMenu);
        setShowFileMenu(false);
        setShowEditMenu(false);
        setShowViewMenu(false);
        break;
      case "copy-url":
        navigator.clipboard.writeText(window.location.href);
        setShowEditMenu(false);
        break;
      case "change-bg-color":
        const currentColorIndex = presetColors.indexOf(bgColor);
        const nextColorIndex = (currentColorIndex + 1) % presetColors.length;
        const nextColor = presetColors[nextColorIndex];
        setBgColor(nextColor);
        setShowViewMenu(false);
        document.body.style.backgroundColor = nextColor;
        break;
      default:
        break;
    }
  };

  const handleOpenWindow = (component, title) => {
    openWindow(component, title);
  };

  return (
    <div className="navigation">
      				<h1 className="navigation-logo" style={{ fontWeight: 'bold' }}>
        <Link href="/">
          garauxo
        </Link>
      </h1>

      <div className="menu-item" onClick={() => handleMenuClick("file")}>
        File
        {showFileMenu && (
          <div className="dropdown">
            <ul>
              {navItems.map((navItem) => (
                navItem[0] === 'Photography' ? (
                  <li key={navItem[0]} onClick={() => handleOpenWindow(<PhotoGrid />, navItem[0])}>
                    <span className="header__nav-item">{navItem[0]}</span>
                  </li>
                ) : (
                  <Link href={navItem[1]} key={navItem[0]}>
                    <li>
                      <span className="header__nav-item">{navItem[0]}</span>
                    </li>
                  </Link>
                )
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => handleMenuClick("edit")}>
        Edit
        {showEditMenu && (
          <div className="dropdown">
            <ul>
              <li onClick={() => handleMenuClick("copy-url")}>Copy</li>
            </ul>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => handleMenuClick("view")}>
        View
        {showViewMenu && (
          <div className="dropdown">
            <ul>
              <li onClick={() => handleMenuClick("change-bg-color")}>Change BG Color</li>
              <li onClick={() => handleMenuClick("change-bg-color")}>LavaLampr</li>
            </ul>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => handleMenuClick("go")}>
        Go
        {showGoMenu && (
          <div className="dropdown">
            <ul>
              <a href="https://instagram.com/garauxo" target="_blank">
                <li>
                  Instagram
                </li>
              </a>
              <a href="https://linkedin.com/in/gsous" target="_blank">
                <li>
                  Linkedin
                </li>
              </a>
              <a href="https://github.com/developer-gabe" target="_blank">
                <li>
                  Github
                </li>
              </a>
              <a href="mailto:gsousa09@icloud.com">
                <li>
                  Email
                </li>
              </a>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
