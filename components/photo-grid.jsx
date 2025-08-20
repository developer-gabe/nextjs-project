import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/PhotoGrid.module.css';

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
    };
  }

  render() {
    const { photos } = this.state;

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Photography</h2>
        <div className={styles.grid}>
          {photos.map((photo) => (
            <Link href={`/photography/${photo.id}`} key={photo.id} className={styles.photoLink}>
              <div className={styles.photoCard}>
                <Image 
                  src={photo.src} 
                  alt={photo.title || 'Photography'} 
                  width={200} 
                  height={200} 
                  className={styles.photoImage}
                />
                {photo.title && (
                  <div className={styles.photoTitle}>
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
