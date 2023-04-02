import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

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
      <div className="photo-grid__container">
        <div className="photo-grid">
          {photos.map((photo) => (
            <Link href={`/photography/${photo.id}`} key={photo.id}>
							<Image src= {photo.src} alt={photo.title} width={220} height={250} className="photo-grid__card" />
            </Link>
          ))}
        </div>
        <style jsx global>{`

          .photo-grid {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: 1fr 1fr 1fr;
          }

          .photo-grid__card {
            display: flex;
            background-color: #eee;
            background-size: cover;
            background-repeat: no-repeat;
            justify-self: center;
            border: 2px solid #251f54;
            cursor: pointer;
            overflow: hidden;
          }

          .photo-grid__card div {
            width: 100%;
            height: 100%;
          }

          .photo-grid__controls {
            display: block;
            text-align: center;
            margin: auto;
          }

          button {
            padding: 0.5rem 2rem;
            margin: auto;
            background: #d496b1;
            border: none;
            color: #fff;
            font-size: 2rem;
            margin: 0 0.5rem;
            width: 100px;
            transition: all ease-in-out 250ms;
          }

          button:hover {
            transform: scale(0.9);
          }

          button:active {
            background: #ffcbe5;
          }

          @media (max-width: 800px) {
            .photo-grid {
              grid-template-columns: 1fr 1fr;
							margin: auto;
            }

						.photo-grid__card {
							justify-self: center;
							width: 100%;
							height: 100%;
						}
          }

					@media (max-width: 675px) { 
					.photo-grid {
						grid-template-columns: 1fr;
						grid-gap: 20px
					}

					.photo-grid__card {
						height: 100%;
						width: 100%;
					}
					
				}

				@media (hover: none) { 
					.photo-grid__card:hover { 
						transform: scale(1);
					}
				}
				`}
			</style>
		</div>
);
}

}

export default PhotoGrid;
