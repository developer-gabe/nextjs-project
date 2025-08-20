import React, { useState } from 'react';
import styles from '../styles/BlogListWindow.module.css';

const BlogListWindow = ({ allPostsData, onOpenPost }) => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'post'
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPost(null);
  };
  if (currentView === 'post' && selectedPost) {
    return (
      <div className={styles.blogListWindow}>
        <div className={styles.blogPostNavbar}>
          <button className={styles.backButton} onClick={handleBackToList}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            Back to Posts
          </button>
          <span className={styles.postNavTitle}>Blog Post</span>
        </div>
        <div className={styles.blogPostContainer}>
          <div className={styles.blogPostHeader}>
            <h1 className={styles.blogPostMainTitle}>{selectedPost.title}</h1>
            <div className={styles.blogPostMeta}>
              <p className={styles.blogPostMainDate}>
                {new Date(new Date(selectedPost.date).setDate(new Date(selectedPost.date).getDate() + 1))
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
              <p className={styles.blogPostReadingTime}>
                {Math.ceil(selectedPost.contentHtml?.split(' ').length / 200 || 1)} minute read
              </p>
            </div>
          </div>
          <div className={styles.blogPostContent} dangerouslySetInnerHTML={{ __html: selectedPost.contentHtml }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogListWindow}>
      <div className={styles.blogListHeader}>
        <h2 className={styles.blogListTitle}>All Blog Posts</h2>
      </div>
      <div className={styles.blogPostsContainer}>
        <div className={styles.blogPostsGrid}>
        {allPostsData.map((post) => (
          <div
            key={post.id}
            className={styles.blogPostItem}
            onClick={() => handlePostClick(post)}
          >
            <div className={styles.blogPostIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <div className={styles.blogPostInfo}>
              <h3 className={styles.blogPostTitle}>{post.title}</h3>
              <p className={styles.blogPostDate}>
                {new Date(new Date(post.date).setDate(new Date(post.date).getDate() + 1))
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListWindow;