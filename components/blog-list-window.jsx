import React from 'react';

const BlogListWindow = ({ allPostsData, onOpenPost }) => {
  return (
    <div className="blog-list-window">
      <h2>All Blog Posts</h2>
      <div className="blog-posts-grid">
        {allPostsData.map((post) => (
          <div
            key={post.id}
            className="blog-post-item"
            onClick={() => onOpenPost(post)}
          >
            <div className="blog-post-icon">📄</div>
            <div className="blog-post-info">
              <h3>{post.title}</h3>
              <p className="blog-post-date">
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
  );
};

export default BlogListWindow;