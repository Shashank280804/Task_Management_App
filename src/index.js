// Import required modules and initialize Express
const express = require("express");
require('./db/mongoose') // Connect to the MongoDB database
const app = express();
const port = process.env.PORT || 3000;
const userRouter=require('./routers/user') // Import user router
const taskRouter=require('./routers/task') // Import task router
const bcrypt=require('bcryptjs') // Import bcrypt for password hashing
const jwt=require('jsonwebtoken') // Import jsonwebtoken for generating JWT tokens

// Multer for file uploads
const multer=require('multer')
const upload=multer({
  dest:'images', // Destination directory for uploaded files
  limits:{
    fileSize:1000000 // Limit file size to 1 MB
  },
  fileFilter(req,file,cb){
    // Check if file extension is .doc or .docx
    if(!file.originalname.match(/.(doc|docx)$/)){
     return cb(new Error('File must be a Word document'))
    }
    
    cb(undefined,true)

  }
})

// Route for uploading files
app.post('/upload',upload.single('upload'),(req,res)=>{
  res.send() // Send a success response if upload is successful
},(error,req,res,next)=>{
  res.status(400).send({error:error.message}) // Send an error response if upload fails
})

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to use user router for user-related endpoints
app.use(userRouter)
// Middleware to use task router for task-related endpoints
app.use(taskRouter)

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Server is up on the port: " + port);
});

// Import User and Task models (assumed to be defined in separate files)
const User=require('./models/user')
const Task=require('./models/task')
