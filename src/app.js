// Import the required modules and initialize Express
const express = require('express')
require('./db/mongoose') // Connect to the MongoDB database
const userRouter = require('./routers/user') // Import user router
const taskRouter = require('./routers/task') // Import task router

const app = express() // Create an Express application instance

// Middleware to parse incoming JSON requests
app.use(express.json())
// Middleware to use user router for user-related endpoints
app.use(userRouter)
// Middleware to use task router for task-related endpoints
app.use(taskRouter)

module.exports = app // Export the Express application instance
