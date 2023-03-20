import { getSortedPostsData } from '../lib/posts';
import { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

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

  const filteredPosts = allPostsData.filter(
    ({ title, tags }) =>
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <main className="Posts">
      <section className="blog-list__section">
        <h2>Search:</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Find..."
          className="search-input"
        />
        <h2>Posts:</h2>
        {filteredPosts.length > 0 ? (
          <ul className="blog-list">
            {filteredPosts.map(({ id, date, title }) => (
              <li key={id} className="blog-list__item">
                <Link href={`/posts/${id}`}>{title}</Link>
                <p className="blog-post__date">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nothing here...</p>
        )}
        <h2>Tags:</h2>
        <ul className="tag-list">
          {uniqueTags.map((tag) => (
            <li key={tag} className="tag-list-item">
              <Link href={`/posts?search=${tag}`} onClick={(event) => handleTagClick(event, tag)} className="tag button">{tag}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
