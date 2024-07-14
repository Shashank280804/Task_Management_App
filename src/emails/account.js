// Import the SendGrid module
const sgMail = require('@sendgrid/mail');

// SendGrid API key
const sendgridApi = 'mqu7rcQkSpm9lLWoiLxy1g';

// Set the SendGrid API key
sgMail.setApiKey(sendgridApi);

// Function to send a welcome email
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email, // Recipient email address
        from: 'shashankpatil00003@gmail.com', // Sender email address
        subject: 'Thanks for joining in', // Email subject
        text: `Welcome to the app, ${name}.` // Email body
    });
};

// Function to send a cancellation email
const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email, // Recipient email address
        from: 'shashankpatil00003@gmail.com', // Sender email address
        subject: 'Sorry to see you go!', // Email subject
        text: `Goodbye, ${name}. I hope to see you back sometime soon.` // Email body
    });
};

// Export the email utility functions
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
};
