
import { getSortedPostsData } from '../lib/posts';
import { useWindows } from '../lib/WindowContext';
import BlogPost from '../components/blog-post';
import Bio from '../components/bio';
import DesktopIcons from '../components/DesktopIcons';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { openWindow } = useWindows();

  const handleOpenPost = (post) => {
    openWindow(<BlogPost post={post} />, post.title);
  };

  const handleOpenBio = () => {
    openWindow(<Bio />, "About Me");
  };

  return (
    <main className='desktop'>
      <DesktopIcons 
        allPostsData={allPostsData} 
        onOpenPost={handleOpenPost}
        onOpenBio={handleOpenBio}
      />
    </main>
  );
}
