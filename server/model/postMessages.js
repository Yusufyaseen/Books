import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  pdf: String,
  image: String,
  creator: String,
  tags: [String],
  selectedFile: String, // Where we are going to convert an image to a string using the base64
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
let postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;
