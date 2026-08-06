
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getSortedPostsData } from '../lib/posts';
import { useWindows } from '../lib/WindowContext';
import Bio from '../components/bio';
import DesktopIcons from '../components/DesktopIcons';
import BlogListWindow from '../components/blog-list-window';

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
  const router = useRouter();
  const hasHandledDeepLink = useRef(false);

  const handleOpenBio = () => {
    openWindow(<Bio />, "About Me");
  };

  // Support deep links from other pages (e.g. MagazineHeader on /photography)
  // into the desktop's Blog window: /?openBlog=true or /?post=<id>
  useEffect(() => {
    if (!router.isReady || hasHandledDeepLink.current) return;
    hasHandledDeepLink.current = true;

    const { post: postId, openBlog } = router.query;
    if (postId) {
      const post = allPostsData.find((p) => p.id === postId);
      if (post) {
        openWindow(<BlogListWindow allPostsData={allPostsData} initialPostId={postId} />, post.title);
      }
    } else if (openBlog) {
      openWindow(<BlogListWindow allPostsData={allPostsData} />, "Blog Posts");
    }
  }, [router.isReady, router.query, allPostsData, openWindow]);

  return (
    <main className='desktop'>
      <DesktopIcons
        allPostsData={allPostsData}
        onOpenBio={handleOpenBio}
      />
    </main>
  );
}
