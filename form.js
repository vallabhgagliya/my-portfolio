const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // You can use any port
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-mail', async (req, res) => {
    const { email, message,name ,subject,Phone_number} = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.your-email-provider.com',
        service: 'gmail', // e.g., Gmail, Outlook, etc.
        secure:true,
        port:465,
        auth: {
            user: 'vallabhgagliya10@gmail.com', // Your email
            pass: 'qdta wjlt xhqs qdjk', // Your email password or app-specific password
        },
        tls: {
            rejectUnauthorized: false, // Ignore self-signed certificate errors
        },
    });

    const mailOptions = {
        from:"vallabhgagliya10@gmail.com", // Sender's email
        to: 'vallabhgagliya10@gmail.com', // Receiver's email
        subject:subject, // Subject line
        text:message, // Plain text body
        html:'<p style = "font-size: 2rem"><br/>Name: '+name +'<br/>Email: '+email+'<br/>Mobile No.: '+Phone_number+' <br/>subject: '+subject+' <br/>message: '+message+'</p>' ,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("<script>alert ('Thank you for reaching out! We have received your details and will be in touch with you shortly.'); window.location.href = 'index.html';</script>");
    } catch (error) {
        console.error(error);
        res.send("<script>alert ('An error occurred while sending your message. Please try again later.'); window.location.href = 'index.html';</script>");
    }

});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
