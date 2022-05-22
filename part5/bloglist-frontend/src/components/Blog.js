import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleView}>{view ? "Hide" : "View"}</button>
      {view && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button>Like</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
