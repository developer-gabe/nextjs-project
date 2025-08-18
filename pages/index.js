import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Bio from '../components/bio';
import Image from 'next/image';
import MagazineHeader from '../components/MagazineHeader';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home ({ allPostsData }){
  
  // Daily rotating photo from gallery
  const galleryImages = [
    'DSC00075.jpg',
    'DSC00236.jpg', 
    'DSC00331.jpg',
    'DSC00792.jpg',
    'DSC00838.jpg',
    'DSC01000.jpg',
    'DSC01586.jpg',
    'DSC01636.jpg',
    'DSC03401.jpg',
    'DSC06100.jpg',
    'rmnp.jpg',
    'tall.jpg'
  ];
  
  // Use current date as seed to get consistent daily image
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const dailyImage = galleryImages[dayOfYear % galleryImages.length];
	
  return (
    <div className='magazine-layout'>
      <MagazineHeader allPostsData={allPostsData} showSearch={true} />

      <main className='magazine-main'>
        <div className='main-content'>
          <div className='featured-section'>
            <div className='featured-image-container'>
              <Image 
                src={`/images/gallery/${dailyImage}`}
                alt="Featured photography"
                width={800}
                height={600}
                className='featured-image'
              />
            </div>
            <div className='featured-content'>
              <span className='category-label'>PHOTOGRAPHY</span>
              <h1 className='featured-title'>Capturing Moments Through the Lens</h1>
              <p className='featured-excerpt'>
                Exploring the world through photography, one frame at a time. 
                From landscapes to street photography, each image tells a unique story.
              </p>
              <Link href='/photography' className='read-more-btn'>View Gallery</Link>
            </div>
          </div>
        </div>

        <aside className='magazine-sidebar'>
          <div className='sidebar-section'>
            <h3 className='sidebar-title'>LATEST POSTS</h3>
            <ul className='sidebar-posts'>
              {allPostsData.slice(0, 5).map(({ id, date, title }) => (
                <li key={id} className="sidebar-post-item">
                  <Link href={`/posts/${id}`} className='sidebar-post-link'>
                    <span className='post-title'>{title}</span>
                    <span className='post-date'>
                      {new Date(new Date(date).setDate(new Date(date).getDate() + 1))
                        .toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href='/posts' className='sidebar-more-link'>More Posts</Link>
          </div>

          <div className='sidebar-section'>
            <h3 className='sidebar-title'>ABOUT</h3>
            <div className='sidebar-bio'>
              <Bio />
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}