import React from "react";
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function BlogList ({ allPostsData }){

  return (
			<section>
        <h2>Blog</h2>
        <ul className="blog-list">
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className="blog-list__item">
						{/* link goes below */}
							<a href={`/posts/${id}`}>{title}</a>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
  )
}
