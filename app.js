const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jobService = require('./jobService');

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/services', (req, res) => {
    res.json(jobService);
});

app.post('/api/order', (req, res) => {
    const { firstN, lastN, email, phone, address, serviceWanted } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'narrowblazedelta1@gmail.com',
            pass: 'fpob fuaj hatq cfgw',
        },
    });

    const mailOptions = {
        from: email,
        to: 'narrowblazedelta1@gmail.com',
        subject: 'New Order Form Submission',
        text: `
            First Name: ${firstN}
            Last Name: ${lastN}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            Service Wanted: ${serviceWanted}
        `,
    };

    transporter.sendMail(mailOptions)
        .then(() => {
            console.log('Email sent');
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ error: 'Email failed to send' });
        });
});

app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
});
