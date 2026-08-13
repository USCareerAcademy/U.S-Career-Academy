require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, course, message } = req.body;

        // Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All required fields must be filled out.' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please enter a valid email address.' 
            });
        }

        // Sanitize inputs
        const sanitizedName = name.trim().replace(/[<>]/g, '');
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPhone = phone.trim().replace(/[<>]/g, '');
        const sanitizedCourse = course ? course.trim() : 'Not specified';
        const sanitizedMessage = message.trim().replace(/[<>]/g, '');

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'uscarrieracademy99@gmail.com',
            subject: `New Contact Form Submission - ${sanitizedName}`,
            text: `
Full Name: ${sanitizedName}

Email Address: ${sanitizedEmail}

Phone Number: ${sanitizedPhone}

Course Interested In: ${sanitizedCourse}

Message:
${sanitizedMessage}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Log successful submission
        console.log(`[${new Date().toISOString()}] Contact form submitted by ${sanitizedName} (${sanitizedEmail})`);

        res.json({ 
            success: true, 
            message: 'Thank you! Your message has been sent successfully. Our team will contact you soon.' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        
        // Log failed attempt
        console.error(`[${new Date().toISOString()}] Failed contact form submission: ${error.message}`);
        
        res.status(500).json({ 
            success: false, 
            message: 'Something went wrong. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});