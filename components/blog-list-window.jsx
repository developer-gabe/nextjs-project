import React, { useState, useMemo } from 'react';
import { formatPostDate } from '../lib/postFormatting';
import styles from '../styles/BlogListWindow.module.css';

const BlogListWindow = ({ allPostsData, initialPostId = null }) => {
  const initialPost = initialPostId
    ? allPostsData.find((post) => post.id === initialPostId)
    : null;
  const [currentView, setCurrentView] = useState(initialPost ? 'post' : 'list');
  const [selectedPost, setSelectedPost] = useState(initialPost);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const uniqueTags = useMemo(
    () => Array.from(new Set(allPostsData.flatMap((post) => post.tags || []))),
    [allPostsData]
  );

  const filteredPosts = useMemo(() => {
    return allPostsData.filter(({ title, tags = [] }) => {
      if (activeTag && !tags.includes(activeTag)) return false;
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        title.toLowerCase().includes(query) ||
        tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [allPostsData, searchQuery, activeTag]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPost(null);
  };

  const handleTagClick = (tag) => {
    setActiveTag((current) => (current === tag ? null : tag));
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
                {formatPostDate(selectedPost.date)}
              </p>
              <p className={styles.blogPostReadingTime}>
                {selectedPost.readingTime} minute read
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
        <div className={styles.searchInputContainer}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search posts..."
            className={styles.searchInput}
          />
        </div>
        {uniqueTags.length > 0 && (
          <div className={styles.tagChips}>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${styles.tagChip} ${activeTag === tag ? styles.tagChipActive : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.blogPostsContainer}>
        {filteredPosts.length > 0 ? (
          <div className={styles.blogPostsGrid}>
            {filteredPosts.map((post) => (
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
                  <p className={styles.blogPostExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogPostFooter}>
                    <p className={styles.blogPostDate}>{formatPostDate(post.date)}</p>
                    <p className={styles.blogPostReadingTimeSmall}>{post.readingTime} min read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noPosts}>No posts found matching your search.</div>
        )}
      </div>
    </div>
  );
};

export default BlogListWindow;
