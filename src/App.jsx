// src/App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, editPost } from './redux/postsSlice';
import PostsDisplay from './components/PostsDisplay';
import CreatePost from './components/CreatePost';

const App = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [editingPost, setEditingPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = (post) => {
    if (editingPost) {
      dispatch(editPost({ ...post, id: editingPost.id }));
      setEditingPost(null);
    } else {
      dispatch(addPost(post));
    }
    setIsModalVisible(false);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalVisible(true);
  };

  return (
    <div className="App">
      <h1 className='main-head'>Post App</h1>
      <CreatePost
        onSubmit={handleCreate}
        editingPost={editingPost}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <PostsDisplay posts={posts} onEdit={handleEdit} />
    </div>
  );
};

export default App;
