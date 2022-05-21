import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Logout from "./components/Logout";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user)
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("invalid username or password");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        author: author,
        url: blogUrl,
      };
      blogService.create(newBlog).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setSucessMessage(`A new blog ${title} added`);
        setTitle("");
        setAuthor("");
        setBlogUrl("");
        setTimeout(() => {
          setSucessMessage(null);
        }, 5000);
      });
    } catch (exception) {
      setErrorMessage("Fill all the fields");
      setTitle("");
      setAuthor("");
      setBlogUrl("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistAppUser");
    console.log("logged out");
  };

  const handleChange = ({ target }) => {
    if (target.name === "username") {
      setUsername(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    } else if (target.name === "title") {
      setTitle(target.value);
    } else if (target.name === "author") {
      setAuthor(target.value);
    } else if (target.name === "url") {
      setBlogUrl(target.value);
    }
  };

  return (
    <div className="App">
      <h1>Blogs</h1>
      <Notification errorMessage={errorMessage} sucessMessage={sucessMessage} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          onChange={handleChange}
          onSubmit={handleLogin}
        />
      )}
      {user && <Logout user={user} logout={handleLogout} />}
      {user && (
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          blogUrl={blogUrl}
          onChange={handleChange}
        />
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
