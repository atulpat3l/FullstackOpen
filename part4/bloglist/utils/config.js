require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MongoDB_URI = process.env.NODE_ENV === 'test' ? process.env.TESTMongoDB_URI : process.env.MongoDB_URI;

module.exports = {
  PORT,
  MongoDB_URI,
};
