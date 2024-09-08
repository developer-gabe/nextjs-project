

import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Bio from '../components/bio';
import { useWindows } from '../lib/WindowContext';
import BlogPost from '../components/blog-post';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home ({ allPostsData }) {
  const { openWindow } = useWindows();

  const handleOpenPost = (post) => {
    openWindow(<BlogPost post={post} />, post.title);
  };

  return (
    <main className='Home'>
      <Bio />
      <section className='blog-list__section'>
        <h2>Latest Posts:</h2>
        <ul className="blog-list">
          {allPostsData.slice(0,3).map((post) => (
            <li key={post.id} className="blog-list__item" onClick={() => handleOpenPost(post)}>
              {post.title}
              <p className='blog-post__date'>
                {new Date(new Date(post.date).setDate(new Date(post.date).getDate() + 1))
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </li>
          ))}
        </ul>
        <div className='see-all-btn-container'>
          {/* Consider modifying or removing this if you handle all posts similarly */}
          <Link href={'/posts'} className="button">All Posts</Link>
        </div>
      </section>
    </main>
  );
}
