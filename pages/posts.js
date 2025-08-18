import { getSortedPostsData } from '../lib/posts';
import { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import MagazineHeader from '../components/MagazineHeader';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPostsData.filter(({ title, tags }) => {
    //.DS_Store ruining my life
    if (!title || !tags) return false;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', event.target.value);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.pushState(null, '', newUrl);
  }

  function handleTagClick(event, tag) {
    event.preventDefault();
    setSearchQuery(tag);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', tag);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.pushState(null, '', newUrl);
  }

  const uniqueTags = Array.from(new Set(allPostsData.flatMap((post) => post.tags)));

  return (
    <div className='magazine-layout'>
      <MagazineHeader allPostsData={allPostsData} showSearch={true} />
      
      <main className='magazine-main posts-main'>
        <div className='posts-content'>
          <div className='posts-header'>
            <h1>Blog Posts</h1>
            <p>Rubber duck thoughts</p>
          </div>
          
          <div className='posts-search-section'>
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
                className="posts-search-input"
              />
            </div>
            
            <div className='posts-tags'>
              {uniqueTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={(event) => handleTagClick(event, tag)}
                  className="posts-tag-btn"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className='posts-list-section'>
            {filteredPosts.length > 0 ? (
              <div className='posts-grid'>
                {filteredPosts.map(({ id, date, title, tags }) => (
                  <article key={id} className="post-card">
                    <Link href={`/posts/${id}`} className='post-card-link'>
                      <div className='post-card-content'>
                        <div className='post-card-header'>
                          <p className='post-card-date'>
                            {new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <h2 className='post-card-title'>{title}</h2>
                        </div>
                        <div className='post-card-tags'>
                          {tags.slice(0, 3).map((tag) => (
                            <span key={tag} className='post-card-tag'>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className='no-posts'>
                <p>No posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
