import { getAllPhotoIds, getPhotoData } from '../../lib/photos'
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
			
      <img src={`/images/gallery/${photoData.name}`} alt={photoData.name} />

			<div className='single-photography-page__content'>
				<h1>{photoData.id}</h1>
				
				<p>Photo ID: {photoData.id}</p>

				<p>Photo Name: {photoData.name}</p>

			</div>
    </div>
  );
}