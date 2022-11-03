const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  site: {
    type: String,
    required: true,
    trim: true,
  },
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contacts: [urlSchema],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  displayPicture: {
    exists: {
      type: Boolean,
      required: true,
      default: false,
    },
    link: {
      type: String,
      required: true,
      default: null,
    },
    public_id: {
      type: String,
      required: true,
      default: null,
    },
  },
});

contactSchema.plugin(validator);

contactSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj.__v;
    delete obj._id;
  },
});

urlSchema.set("toJSON", {
  trensform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
