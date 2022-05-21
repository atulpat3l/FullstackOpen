import React from "react";

const BlogForm = ({ onSubmit, onChange, title, author, blogUrl }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={onChange}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        type="text"
        value={author}
        onChange={onChange}
      />
      <label htmlFor="url">Url</label>
      <input
        id="url"
        name="url"
        type="text"
        value={blogUrl}
        onChange={onChange}
      />
      <button className="btn--save" type="submit">
        Save
      </button>
    </form>
  );
};

export default BlogForm;
<div>BlogForm</div>;
