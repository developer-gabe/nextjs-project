import { getAllPhotoIds, getPhotoData } from '../../lib/photos'
import Image from "next/image";

export async function getStaticPaths() {
  const paths = getAllPhotoIds().map((id) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const photoData = getPhotoData(params.id);
  return {
    props: {
      photoData
    }
  };
}

export default function Photo({ photoData }) {
  if (!photoData) return <div>Loading...</div>;
  return (
    <div className='single-photography-page'>
			
      <Image src={`/images/gallery/${photoData.name}`} alt={photoData.name} width={800} height={800}/>

			<div className='single-photography-page__content'>
				<h1>{photoData.id}</h1>
				
				<p>File Name: {photoData.name}</p>

			</div>
    </div>
  );
}
