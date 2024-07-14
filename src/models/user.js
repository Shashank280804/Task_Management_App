// Import required modules
const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// Define the user schema
const userSchema = new mongoose.Schema({
  // Define the name field
  name: {
    type: String,
    required: true, // Required field
    trim: true // Trim whitespace from the beginning and end of the string
  },
  // Define the email field
  email:{
    type: String,
    unique: true, // Ensure email uniqueness
    required: true, // Required field
    trim: true, // Trim whitespace from the beginning and end of the string
    lowercase: true, // Convert email to lowercase
    validate(value){
        // Validate email format using validator library
        if(!validator.isEmail(value)){
         throw new Error('Email is invalid');
        }
     }
  },
  // Define the password field
  password:{
     type: String,
     required: true, // Required field
     trim: true, // Trim whitespace from the beginning and end of the string
     minlength: 7, // Minimum length of 7 characters
     validate(value){
        // Validate password format
        if(value.toLowerCase().includes('password')){
            throw new Error('Password cannot contain "password"');
        }
     }
  },
  // Define the age field
  age: {
    type: Number,
    default: 0, // Default value is 0
    validate(value){
        // Validate age to be positive
        if(value < 0){
            throw new Error('Age must be a positive number');
        }
    }
  },
  // Define the tokens array to store authentication tokens
  tokens:[{
       token:{
        type: String,
        required: true
       }
  }],
  // Define the avatar field to store user avatar image data
  avatar:{
   type: Buffer // Binary data for avatar image
  }
},{
   timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

// Define a virtual property to establish a relationship with tasks
userSchema.virtual('tasks', {
   ref: 'Task', // Reference to the Task model
   localField: '_id', // Local field to match against
   foreignField: 'owner' // Foreign field in the Task model
});

// Method to remove sensitive data before sending user object as JSON
userSchema.methods.toJSON = function(){
   const user = this;
   const userObject = user.toObject();
   delete userObject.password;
   delete userObject.tokens;
   return userObject;
};

// Method to generate authentication token for user
userSchema.methods.generateAuthToken = async function(){
   const user = this;
   const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
   user.tokens = user.tokens.concat({ token });
   await user.save();
   return token;
};

// Static method to find user by credentials (email and password)
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if(!user){
     throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch){
    throw new Error('Unable to login');
   }
  return user;
};

// Middleware to hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Middleware to delete user tasks when user is removed
userSchema.pre('remove', async function(next){
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Create the User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
