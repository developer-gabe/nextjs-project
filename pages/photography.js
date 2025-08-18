import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MagazineHeader from '../components/MagazineHeader';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Portfolio = ({ allPostsData }) => {
  // Photo data with more details for magazine-style presentation
  const photos = [
    { 
      id: "DSC00331", 
      src: "/images/gallery/DSC00331.jpg", 
      title: "Desert Solitude", 
      location: "San Luis Valley, Colorado",
      year: "2023",
      description: "A minimalist landscape capturing the vast emptiness and subtle beauty of Colorado's high desert.",
      featured: true
    },
    { 
      id: "DSC00075", 
      src: "/images/gallery/DSC00075.jpg", 
      title: "Mountain Vista",
      location: "Rocky Mountain National Park",
      year: "2023",
      description: "Early morning light illuminates the rugged peaks of the Continental Divide."
    },
    { 
      id: "tall", 
      src: "/images/gallery/tall.jpg", 
      title: "Vertical Ascent",
      location: "Colorado Rockies",
      year: "2023",
      description: "A study in verticality, showcasing the dramatic rise of mountain peaks against the sky."
    },
    { 
      id: "rmnp", 
      src: "/images/gallery/rmnp.jpg", 
      title: "Alpine Majesty",
      location: "Rocky Mountain National Park",
      year: "2023",
      description: "The raw beauty of the high country, where weather and light create ever-changing scenes."
    },
    { 
      id: "DSC00838", 
      src: "/images/gallery/DSC00838.jpg", 
      title: "Desert Light",
      location: "American Southwest",
      year: "2023",
      description: "Golden hour transforms the desert landscape into a canvas of light and shadow."
    },
    { 
      id: "DSC01000", 
      src: "/images/gallery/DSC01000.jpg", 
      title: "Golden Hour",
      location: "Colorado Front Range",
      year: "2023",
      description: "The last light of day paints the landscape in warm, golden tones."
    },
    { 
      id: "DSC01586", 
      src: "/images/gallery/DSC01586.jpg", 
      title: "Mountain Silhouette",
      location: "Rocky Mountains",
      year: "2023",
      description: "A dramatic interplay of light and shadow defines the mountain ridges at sunset."
    },
  ];

  const featuredPhoto = photos.find(photo => photo.featured) || photos[0];
  const galleryPhotos = photos.filter(photo => !photo.featured);

  return (
    <div className='magazine-layout'>
      <MagazineHeader showSearch={true} allPostsData={allPostsData} />
      
      <main className='magazine-main photography-main'>
        <div className='photography-content'>
          {/* Hero Section */}
          <section className='photography-hero'>
            <div className='hero-text'>
              <div className='hero-category'>
                <span className='category-label'>PHOTOGRAPHY</span>
                <span className='photo-count'>{photos.length} Images</span>
              </div>
              <h1 className='hero-title'>Capturing Light & Landscape</h1>
              <p className='hero-description'>
                A visual exploration of the American West's dramatic landscapes, from the high peaks of the Rocky Mountains 
                to the vast desert valleys. Each image is a meditation on light, form, and the raw beauty of untamed places.
              </p>
            </div>
            
            <div className='hero-image-container'>
              <Link href={`/photography/${featuredPhoto.id}`} className='hero-image-link'>
                <div className='hero-image-wrapper'>
                  <Image 
                    src={featuredPhoto.src} 
                    alt={featuredPhoto.title}
                    fill
                    className='hero-image'
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className='hero-image-overlay'>
                    <div className='hero-image-info'>
                      <h3 className='hero-image-title'>{featuredPhoto.title}</h3>
                      <p className='hero-image-location'>{featuredPhoto.location} • {featuredPhoto.year}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className='photography-gallery'>
            <div className='gallery-header'>
              <h2 className='gallery-title'>The Collection</h2>
              <p className='gallery-subtitle'>Each image tells a story of light, landscape, and the moments in between</p>
            </div>
            
            <div className='photo-masonry'>
              {galleryPhotos.map((photo, index) => (
                <Link href={`/photography/${photo.id}`} key={photo.id} className='photo-item'>
                  <div className={`photo-card ${index % 3 === 0 ? 'tall' : index % 5 === 0 ? 'wide' : ''}`}>
                    <div className='photo-wrapper'>
                      <Image 
                        src={photo.src} 
                        alt={photo.title}
                        fill
                        className='photo-image'
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className='photo-overlay'>
                        <div className='photo-info'>
                          <h4 className='photo-title'>{photo.title}</h4>
                          <p className='photo-location'>{photo.location} • {photo.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;