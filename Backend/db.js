// db.js

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/cloudnote';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    // Other code after successful connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String
});

// User.createIndexes();
module.exports = connectToMongo;
