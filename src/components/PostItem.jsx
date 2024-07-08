import React from 'react';

const PostItem = ({ post, onEdit }) => {
  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      {post.image && <img src={post.image} alt={post.title} className='imageDetails'/>}
      <p>{post.content}</p>
      <button onClick={() => onEdit(post)}>Edit</button>
    </div>
  );
};

export default PostItem;
