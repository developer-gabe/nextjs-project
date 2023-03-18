import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  const date = new Date(postData.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
			<article>
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
					<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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