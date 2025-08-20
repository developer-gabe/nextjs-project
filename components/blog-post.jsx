import React from 'react';

const BlogPost = ({ post }) => {
  // Ensure 'post.content' or a similar property holds the HTML content of the post
  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p className="blog-post__date">{new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })}</p>
      <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
};

export default BlogPost;
