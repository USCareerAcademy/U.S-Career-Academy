# Contact Form Email Setup Instructions

## Overview
This setup adds backend email functionality to the contact form. When users submit the contact form, an email will be sent to `uscarrieracademy99@gmail.com`.

## Prerequisites
- Node.js installed on your system
- A Gmail account for sending emails
- App Password from Gmail (required for less secure apps)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password (name it something like "U.S. Career Academy Contact Form")
5. Copy the generated password (16-character string)

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` file with your credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3000
NODE_ENV=development
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `your-16-character-app-password` with the app password you generated

### 4. Start the Server
```bash
npm start
```

The server will start on port 3000 (or the port specified in `.env`).

### 5. Access the Contact Form
Open your browser and navigate to:
```
http://localhost:3000/contact.html
```

## Features Implemented

### ✅ Backend Integration
- Node.js/Express server for handling form submissions
- Nodemailer for secure email delivery via Gmail SMTP
- Environment variables for secure credential storage

### ✅ Email Configuration
- Recipient: `uscarrieracademy99@gmail.com`
- Subject format: `New Contact Form Submission - [Full Name]`
- Structured email body with all form fields

### ✅ Form Validation
- Required field validation (Name, Email, Phone, Message)
- Email format validation
- Input sanitization to prevent XSS attacks
- User-friendly error messages

### ✅ User Experience
- Button disabled during submission
- Loading state ("Sending...")
- Success message: "Thank you! Your message has been sent successfully. Our team will contact you soon."
- Error message: "Something went wrong. Please try again later."
- Form reset on successful submission

### ✅ Security
- Environment variables for credentials (no hardcoded secrets)
- Input sanitization
- CORS configuration
- Server-side validation in addition to client-side

### ✅ Logging
- Console logging for successful submissions
- Error logging for failed attempts
- Timestamp for all log entries

## API Endpoint

### POST /api/contact
Accepts JSON body with:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "course": "ba-master",
  "message": "I'm interested in enrolling..."
}
```

Returns:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully. Our team will contact you soon."
}
```

## Health Check
The server provides a health check endpoint:
```
GET /api/health
```

## Troubleshooting

### Email Not Sending
1. Verify your Gmail app password is correct
2. Check that 2-Step Verification is enabled on your Google account
3. Ensure the app password was generated for the correct email
4. Check server console for error messages

### Server Won't Start
1. Ensure Node.js is installed: `node --version`
2. Check if port 3000 is already in use
3. Try changing the PORT in `.env` file

### Form Validation Errors
1. Check browser console for JavaScript errors
2. Ensure the server is running
3. Verify the API endpoint is accessible

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use a production-ready email service (SendGrid, AWS SES, etc.)
3. Deploy to a hosting service (Heroku, Vercel, AWS, etc.)
4. Configure proper domain and SSL certificates
5. Set up proper logging and monitoring

## Security Notes

- Never commit `.env` file to version control
- Never share your app password
- Regularly rotate your app passwords
- Use strong, unique passwords
- Keep dependencies updated: `npm update`

## Support

For issues or questions, contact:
- Email: uscarrieracademy99@gmail.com
- Phone: +91 7970756046