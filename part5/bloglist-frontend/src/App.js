import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Logout from "./components/Logout";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginUser = async (newObject) => {
    const user = await loginService.login(newObject);
    setUser(user);
    return user;
  };

  const createBlog = (newObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(newObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
  };

  const removeDeletedBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistAppUser");
  };

  const handleSucess = (sucessMessage) => {
    setSucessMessage(sucessMessage);
    setTimeout(() => {
      setSucessMessage(null);
    }, 5000);
  };

  const handleException = (exception) => {
    setErrorMessage(exception);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div className="App">
      <h1>Blogs</h1>
      <Notification errorMessage={errorMessage} sucessMessage={sucessMessage} />
      {!user && (
        <Togglable buttonLabel={"Log In"}>
          <LoginForm loginUser={loginUser} handleException={handleException} />
        </Togglable>
      )}
      {user && <Logout user={user} logout={handleLogout} />}
      {user && (
        <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
            handleException={handleException}
            handleSuccess={handleSucess}
          />
        </Togglable>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={removeDeletedBlog}
        />
      ))}
    </div>
  );
};

export default App;
