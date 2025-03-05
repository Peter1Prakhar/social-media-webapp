import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { addPost, editPost, deletePost } from './postsSlice';

// Ensure screen readers can use the modal
Modal.setAppElement('#root');

const PostForm = ({ isOpen, onClose, initialPost, onSubmit }) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, id: initialPost?.id });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={initialPost ? 'Edit Post' : 'Create Post'}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{initialPost ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="form-actions">
          <button type="submit">{initialPost ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleAddPost = (postData) => {
    dispatch(addPost(postData));
  };

  const handleEditPost = (postData) => {
    dispatch(editPost(postData));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="post-list-container">
      <h1>Social Media Posts</h1>
      <button onClick={() => setIsCreateModalOpen(true)}>
        Create New Post
      </button>

      {/* Create Post Modal */}
      <PostForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddPost}
      />

      {/* Edit Post Modal */}
      {editingPost && (
        <PostForm
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          initialPost={editingPost}
          onSubmit={handleEditPost}
        />
      )}

      {/* Post List */}
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <img src={post.content} alt={post.title} className="post-image" />
            <div className="post-actions">
              <button onClick={() => setEditingPost(post)}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;