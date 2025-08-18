import { getAllPhotoIds, getPhotoData } from '../../lib/photos'
import { getSortedPostsData } from '../../lib/posts';
import Image from "next/image";
import Link from "next/link";
import MagazineHeader from '../../components/MagazineHeader';

export async function getStaticPaths() {
  const paths = getAllPhotoIds().map((id) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const photoData = getPhotoData(params.id);
  const allPostsData = getSortedPostsData();
  return {
    props: {
      photoData,
      allPostsData
    }
  };
}

export default function Photo({ photoData, allPostsData }) {
  if (!photoData) return <div>Loading...</div>;
  
  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='single-photo-main'>
        <div className='single-photo-content'>
          {/* Navigation */}
          <nav className='photo-nav'>
            <Link href="/photography" className='back-to-gallery'>
              ← Back to Gallery
            </Link>
          </nav>

          {/* Photo Category & Title */}
          <header className='photo-header'>
            <div className='photo-category'>
              <span className='category-label'>{photoData.category}</span>
              <span className='photo-meta'>{photoData.location} • {photoData.year}</span>
            </div>
            <h1 className='photo-title'>{photoData.title}</h1>
            <p className='photo-description'>{photoData.description}</p>
          </header>

          {/* Main Image */}
          <figure className='photo-figure'>
            <div className='photo-image-wrapper'>
              <Image 
                src={`/images/gallery/${photoData.name}`} 
                alt={photoData.title}
                width={1200}
                height={800}
                className='photo-image'
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </figure>
        </div>
      </main>
    </div>
  );
}
