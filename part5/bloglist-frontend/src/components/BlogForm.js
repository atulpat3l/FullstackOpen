import React, { useState } from "react";

const BlogForm = ({ createBlog, handleException, handleSuccess }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      createBlog({
        title: title,
        author: author,
        url: blogUrl,
      });
      handleSuccess(`A new blog ${title} added`);
      setTitle("");
      setAuthor("");
      setBlogUrl("");
    } catch (exception) {
      handleException("Fill all the fields");
      setTitle("");
      setAuthor("");
      setBlogUrl("");
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === "title") {
      setTitle(target.value);
    } else if (target.name === "author") {
      setAuthor(target.value);
    } else if (target.name === "url") {
      setBlogUrl(target.value);
    }
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        type="text"
        value={author}
        onChange={handleChange}
      />
      <label htmlFor="url">Url</label>
      <input
        id="url"
        name="url"
        type="text"
        value={blogUrl}
        onChange={handleChange}
      />
      <button className="btn--save" type="submit">
        Save
      </button>
    </form>
  );
};

export default BlogForm;
<div>BlogForm</div>;
