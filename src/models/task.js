// Import the Mongoose module
const mongoose = require('mongoose')

// Define the task schema
const taskSchema = new mongoose.Schema({
    // Define the description field
    description: {
        type: String,
        required: true, // Required field
        trim: true // Trim whitespace from the beginning and end of the string
    },
    // Define the completed field
    completed: {
        type: Boolean,
        default: false // Default value is false
    },
    // Define the owner field as a reference to the User model
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Required field
        ref: 'User' // Reference to the User model
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
})

// Create the Task model based on the task schema
const Task = mongoose.model('Task', taskSchema)

// Export the Task model
module.exports = Task
