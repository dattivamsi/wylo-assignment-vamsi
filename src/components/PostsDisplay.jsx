// src/components/PostsDisplay.js
import React from 'react';
import PostItem from './PostItem';

const PostsDisplay = ({ posts, onEdit }) => {
  console.log(posts,"postsData===>");
  return (
    <div className="posts-display">
      {posts?.length ?
      posts.map((post) => (
        <PostItem key={post.id} post={post} onEdit={onEdit} />
      )) :<>
      <div className='no-posts'>
        <p>There is no posts</p>
      </div>
      </>}
    </div>
  );
};

export default PostsDisplay;
