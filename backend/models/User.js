import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'], 
    unique: true,
    trim: true, 
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: true,
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  age: {
    type: Number,
    default: 18
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User