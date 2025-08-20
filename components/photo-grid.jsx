import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        { id: "DSC00331", src: "/images/gallery/DSC00331.jpg", title: "Somewhere outside Alamosa, Colorado", summary: "Driving back from the dunes, I " },
        { id: "DSC00075", src: "/images/gallery/DSC00075.jpg" },
        { id: "tall", src: "/images/gallery/tall.jpg" },
        { id: "rmnp", src: "/images/gallery/rmnp.jpg" },
        { id: "DSC00838", src: "/images/gallery/DSC00838.jpg" },
        { id: "DSC01000", src: "/images/gallery/DSC01000.jpg" },
        { id: "DSC01586", src: "/images/gallery/DSC01586.jpg" },
      ],
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  }

  render() {
    const { photos, backgroundSize, backgroundRepeat, backgroundPosition } =
      this.state;

    return (
      <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', color: '#333' }}>Photography</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          maxWidth: '100%'
        }}>
          {photos.map((photo) => (
            <Link href={`/photography/${photo.id}`} key={photo.id} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: '#f5f5f5'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#007AFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#ddd';
              }}>
                <Image 
                  src={photo.src} 
                  alt={photo.title || 'Photography'} 
                  width={200} 
                  height={200} 
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {photo.title && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: 'white',
                    padding: '20px 12px 12px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {photo.title}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

}

export default PhotoGrid;
