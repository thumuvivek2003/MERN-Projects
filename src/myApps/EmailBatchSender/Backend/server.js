const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Example batch data
const batches = {
    All: [{ name: 'John Doe', email: 'S190783@rguktsklm.ac.in' }, { name: 'Jane Doe', email: 'thumuvivek2003@gmail.com' }],
    Developers: [{ name: 'Dev A', email: 'thumuvivek2003@gmail.com' }],
    Testers: [{ name: 'Tester A', email: 'thumuvivek2003@gmail.com' }]
};

// Get batch data
app.get('/api/batch/:batchName', (req, res) => {
    const batchName = req.params.batchName;
    res.json(batches[batchName] || []);
});

// Send emails
app.post('/api/send-email', async (req, res) => {
    const { recipients, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'thumuvivek2003@gmail.com', // Your email
            pass: 'bmzk dujw rhid pqmy', // Your email password
        },
    });

    let status = [];

    for (let recipient of recipients) {
        try {
            let info = await transporter.sendMail({
                from: '"Batch Sender" <your_email@gmail.com>',
                to: recipient.email,
                subject: "Batch Email",
                html: message,
            });
            status.push({ email: recipient.email, status: 'Sent' });
        } catch (error) {
            status.push({ email: recipient.email, status: 'Failed' });
        }
    }

    res.json({ status });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
