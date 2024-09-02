const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Example batch data
const batches = {
    developers: [
        { name: 'Developer 1', email: 'developer1@example.com' },
        { name: 'Developer 2', email: 'developer2@example.com' },
        { name: 'Developer 3', email: 'developer3@example.com' },
        { name: 'Developer 4', email: 'developer4@example.com' },
        { name: 'Developer 5', email: 'developer5@example.com' },

    ],
    testers: [
        { name: 'Tester 1', email: 'tester1@example.com' },
        { name: 'Tester 2', email: 'tester2@example.com' },
        { name: 'Tester 3', email: 'tester3@example.com' },
        { name: 'Tester 4', email: 'tester4@example.com' },
        { name: 'Tester 5', email: 'tester5@example.com' },
    ],
    interns: [
        { name: 'Intern 1', email: 'intern1@example.com' },
        { name: 'Intern 2', email: 'intern2@example.com' },
        { name: 'Intern 3', email: 'intern3@example.com' },
        { name: 'Intern 4', email: 'intern4@example.com' },
        { name: 'Intern 5', email: 'intern5@example.com' },
    ],
    devOpsEngineer: [
        { name: 'DevOps Engineer 1', email: 'devops1@example.com' },
        { name: 'DevOps Engineer 2', email: 'devops2@example.com' },
        { name: 'DevOps Engineer 3', email: 'devops3@example.com' },
        { name: 'DevOps Engineer 4', email: 'devops4@example.com' },
        { name: 'DevOps Engineer 5', email: 'devops5@example.com' },
    ],
    frontEndDevelopers: [
        { name: 'Front-End Developer 1', email: 'frontend1@example.com' },
        { name: 'Front-End Developer 2', email: 'frontend2@example.com' },
        { name: 'Front-End Developer 3', email: 'frontend3@example.com' },
        { name: 'Front-End Developer 4', email: 'frontend4@example.com' },
        { name: 'Front-End Developer 5', email: 'frontend5@example.com' },

    ],
    backEndDevelopers: [
        { name: 'Back-End Developer 1', email: 'backend1@example.com' },
        { name: 'Back-End Developer 2', email: 'backend2@example.com' },
        { name: 'Back-End Developer 3', email: 'backend3@example.com' },
        { name: 'Back-End Developer 4', email: 'backend4@example.com' },
        { name: 'Back-End Developer 5', email: 'backend5@example.com' },
    ]
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
