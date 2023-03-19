import { getSortedPostsData } from '../lib/posts';
import { useState } from 'react';
import Link from 'next/link';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts ({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPostsData.filter(({ title, tags }) => 
    title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className='Posts'>
      <section className='blog-list__section'>
        <h2>Search:</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Find..."
          className='search-input'
        />
        <h2>Posts:</h2>
        {filteredPosts.length > 0 ? (
          <ul className="blog-list">
            {filteredPosts.map(({ id, date, title }) => (
              <li key={id} className="blog-list__item">
                <Link href={`/posts/${id}`}>{title}</Link>
                <p className='blog-post__date'>
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
      </section>
    </main>
  )
}
