import Link from 'next/link';
import { useState, useEffect } from 'react';
import MediaPlayer from './MediaPlayer';

export default function MagazineHeader({ allPostsData = [], showSearch = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredPosts = allPostsData.filter(({ title, tags }) => {
    if (!title || !tags) return false;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const uniqueTags = Array.from(new Set(allPostsData.flatMap((post) => post.tags || [])));

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleTagClick(event, tag) {
    event.preventDefault();
    setSearchQuery(tag);
  }

  function handleSearchClick() {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
  }

  function handleCloseSearch() {
    setIsSearchOpen(false);
    setSearchQuery('');
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) {
      handleCloseSearch();
    }
  }

  // Close search and menu on escape key
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        handleCloseSearch();
        setIsMobileMenuOpen(false);
      }
    }

    if (isSearchOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <header className={`magazine-header ${isSearchOpen ? 'search-active' : ''}`}>
      <div className='header-content'>
        {!isSearchOpen ? (
          <>
            <div className='logo'>
              <Link href='/'>garauxo</Link>
            </div>
            
            <button 
              className='mobile-menu-btn'
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>

            <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
              {/* Desktop Navigation Links */}
              <Link href='/posts' className='nav-link'>
                <span className='nav-text'>BLOG</span>
                <span className='nav-underline'></span>
              </Link>
              <Link href='/photography' className='nav-link'>
                <span className='nav-text'>PHOTOGRAPHY</span>
                <span className='nav-underline'></span>
              </Link>


              {/* Mobile Menu Close Button */}
              <button 
                className='mobile-menu-close'
                onClick={toggleMobileMenu}
                aria-label="Close Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              {/* Mobile Menu List */}
              <div className='mobile-menu-list'>
                <Link href='/posts' className='mobile-menu-link' onClick={() => setIsMobileMenuOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                  <span>Blog</span>
                </Link>
                
                <Link href='/photography' className='mobile-menu-link' onClick={() => setIsMobileMenuOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <span>Photography</span>
                </Link>
                


                <div className='mobile-menu-separator'></div>
                
                <button 
                  className='mobile-menu-link'
                  onClick={() => {
                    setIsPlayerVisible(!isPlayerVisible);
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label="Toggle Music Player"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="21" cy="16" r="3"></circle>
                  </svg>
                  <span>Music</span>
                </button>

                <a href="https://instagram.com/garauxo" target="_blank" rel="noopener noreferrer" className='mobile-menu-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
                
                <a href="https://linkedin.com/in/gsous" target="_blank" rel="noopener noreferrer" className='mobile-menu-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                
                <a href="https://github.com/developer-gabe" target="_blank" rel="noopener noreferrer" className='mobile-menu-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
                
                <a href="mailto:gsousa09@icloud.com" className='mobile-menu-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </nav>
            
            <div className='header-actions'>
              {showSearch && (
                <button className='search-btn' onClick={handleSearchClick} aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              )}
              
              <div className='social-links'>
                <button 
                  className='social-link'
                  onClick={() => setIsPlayerVisible(!isPlayerVisible)}
                  aria-label="Toggle Music Player"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="21" cy="16" r="3"></circle>
                  </svg>
                </button>

                <a href="https://instagram.com/garauxo" target="_blank" rel="noopener noreferrer" className='social-link'>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/gsous" target="_blank" rel="noopener noreferrer" className='social-link'>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/developer-gabe" target="_blank" rel="noopener noreferrer" className='social-link'>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="mailto:gsousa09@icloud.com" className='social-link'>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className='search-header'>
            <div className='search-input-container'>
              <svg className='search-icon' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder="Search posts..."
                className="header-search-input"
                autoFocus
              />
            </div>
            <button className='search-close-btn' onClick={handleCloseSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {isSearchOpen && showSearch && (
        <div className='search-results-dropdown'>
          <div className='search-results-content'>
            <div className='search-tags-section'>
              <h3>Popular Tags</h3>
              <div className='search-tags'>
                {uniqueTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={(event) => handleTagClick(event, tag)}
                    className="search-tag-btn"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {searchQuery && (
              <div className='search-results-section'>
                <h3>Results</h3>
                {filteredPosts.length > 0 ? (
                  <ul className='search-results-list'>
                    {filteredPosts.slice(0, 8).map(({ id, date, title }) => (
                      <li key={id} className="search-result-item">
                        <Link href={`/posts/${id}`} onClick={handleCloseSearch}>
                          <span className='result-title'>{title}</span>
                          <span className='result-date'>
                            {new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='no-results'>No posts found...</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Player */}
      <MediaPlayer 
        isVisible={isPlayerVisible} 
        onClose={() => setIsPlayerVisible(false)} 
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={toggleMobileMenu}
        />
      )}

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 80;
        }

        @media (prefers-color-scheme: dark) {
          .mobile-menu-overlay {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      `}</style>
    </header>
  );
} 