import { getAllPostIds, getPostData } from '../../lib/posts'
import { getSortedPostsData } from '../../lib/posts'
import Link from 'next/link'
import MagazineHeader from '../../components/MagazineHeader'

export default function Post({ postData, allPostsData }) {
	const date = new Date(postData.date);
	date.setDate(date.getDate() + 1);
	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
		day: 'numeric',
	})

	const readingTime = Math.ceil(postData.contentHtml.split(' ').length / 200);

  return (
		<div className="magazine-layout">
			<MagazineHeader showSearch={true} allPostsData={allPostsData} />
			<main className="magazine-main article-main">
				<article className="magazine-article">
					<header className="article-header">
						<div className="article-category">
							<span className="category-label">{postData.tags[0]?.toUpperCase() || 'BLOG'}</span>
							<span className="article-time">
								{new Date().toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit',
									hour12: true
								}).toUpperCase()}
							</span>
						</div>
						
						<h1 className="article-title">{postData.title}</h1>
					</header>

					<div className="article-content">
						<div className="article-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
					</div>

					<footer className="article-footer">
						<div className="article-tags">
							{postData.tags.map((tag) => ( 
								<Link key={tag} href={`/posts/?search=${tag}`} className="article-tag">
									{tag}
								</Link>
							))}
						</div>
						
						<div className="article-navigation">
							<Link className="back-to-posts" href="/posts">
								← All Posts
							</Link>
						</div>
					</footer>
				</article>

				<aside className="article-sidebar">
					<div className="reading-info">
						<div className="reading-time">
							<span className="reading-label">Reading Time</span>
							<span className="reading-duration">{readingTime} min read</span>
						</div>
						<div className="publish-date">
							<span className="date-label">Published</span>
							<span className="date-value">{formattedDate}</span>
						</div>
					</div>
				</aside>
			</main>
		</div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const allPostsData = getSortedPostsData();

  return {
    props: {
      postData,
      allPostsData
    },
  };
}