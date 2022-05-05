const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return likes.reduce((sum, item) => sum + item);
};

const favoriteBlog = (blogs) => {
  const arr = blogs.map((blog) => blog.likes);
  const max = Math.max(...arr);
  const index = arr.indexOf(max);
  return blogs[index];
};

const mostBlogs = (blogs) => {
  const authorsArr = blogs.map((blog) => blog.author);
  //use reduce to generate object which holds count
  let authorsObject = authorsArr.reduce((object, value) => {
    object[value] = object[value] || 0;
    //increment the count
    object[value]++;
    // return object reference
    return object;
    //set initial values as an empty object
  }, {});

  let entries = Object.entries(authorsObject);
  let sortedEntries = entries.sort((a, b) => b[1] - a[1]);

  const arr = sortedEntries[0];

  return {
    author: arr[0],
    blogs: arr[1],
  };
};

const mostLikes = (blogs) => {
  const arr = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...arr);
  const index = arr.indexOf(maxLikes);
  const blog = blogs[index];
  console.log(blog);

  const result = {
    author: blog.author,
    likes: blog.likes,
  };
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
