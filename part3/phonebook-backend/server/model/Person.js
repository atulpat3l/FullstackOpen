const mongoose = require("mongoose");
const url = process.env.MongoDB_URI;
console.log("connectiong to", url);
mongoose
  .connect(url)
  .then(console.log("connected to MongoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const validateNumber = (val) => {
  if (val.includes("-")) {
    const arr = val.split("-");
    if (arr[0].length > 3 || arr[0].length < 2 || arr.length > 2) {
      return false;
    }
  }
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, "User phone number required"],
    validate: [validateNumber, "phone number is not valid"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
