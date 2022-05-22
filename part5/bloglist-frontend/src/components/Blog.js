import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, handleDelete }) => {
  const { id, title, author, url } = blog;
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleView = () => {
    setView(!view);
  };

  const newObject = {
    user,
    likes: likes + 1,
    author,
    title,
    url,
  };

  const updateLikes = async (e) => {
    e.preventDefault();
    await blogService.update(id, newObject);
    setLikes((prev) => prev + 1);
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    if (window.confirm(`Remove Blog: ${blog.title}`)) {
      try {
        await blogService.deleteOne(id);
        handleDelete(id);
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {title} {author}
      <button onClick={toggleView}>{view ? 'Hide' : 'View'}</button>
      {view && (
        <>
          <p>{url}</p>
          <p>
            {likes} <button onClick={updateLikes}>Like</button>
          </p>
          <p>{author}</p>
          {user && blog.user.id === user.id && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
