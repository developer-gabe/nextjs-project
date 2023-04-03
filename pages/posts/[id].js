import { getAllPostIds, getPostData } from '../../lib/posts'
import Link from 'next/link'

export default function Post({ postData }) {
	const date = new Date(postData.date);
	date.setDate(date.getDate() + 1);
	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
		day: 'numeric',
	})

  return (
			<article className='blog-post'>
				<div>
					<div className='blog-post__header'>
						<h1 className='blog-post__title'>{postData.title}</h1>
							<p className='blog-post__date'>{formattedDate}</p>
							<p className='blog-post__reading-time'>
								{Math.ceil(postData.contentHtml.split(' ').length / 200)}
								{' '}
								{Math.ceil(postData.contentHtml.split(' ').length / 200) > 1 ? 'minute read' : 'minute read'}
							</p>
					</div>
					<div className='blog-post__content' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
				</div>
				<div className='tag-list'>
					{postData.tags.map((tag) => ( 
						<Link key={tag} href={`/posts/?search=${tag}`} className="button tags">
							{tag}
						</Link>
					))}
				</div>
				<div className='go-back-btn-container'>
					<Link className='button' href={'/posts'}>All Posts</Link>
				</div>
			</article>
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
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}