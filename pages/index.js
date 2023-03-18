import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Bio from '../components/bio';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home ({ allPostsData }){
  return (
    <main className='Home'>
			<Bio />
			<section className='blog-list__section'>
				<h2>Latest Posts:</h2>
        <ul className="blog-list">
          {allPostsData.map(({ id, date, title }) => (
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
      </section>
    </main>
  )
}