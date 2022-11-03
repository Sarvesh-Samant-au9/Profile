const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(validator);

userSchema.set("toJSON", {
  transform: (doc, obj) => {
    console.log(obj, "obj", doc, "doc");
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.password;
  },
});

module.exports = mongoose.model("User", userSchema);
