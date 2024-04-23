const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/fonts', express.static(path.join(__dirname, 'public', 'fonts')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/screenshots', express.static(path.join(__dirname, 'public', 'screenshots')));
app.use('/scss', express.static(path.join(__dirname, 'public', 'scss')));
app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

app.use(express.static(path.join(__dirname, 'public')));

/* ECHO is on. */
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'itz.farhan6710@gmail.com', // Your email address
        pass: 'meye inei aqxb sncf' // Your email password
    }
});

// Function to send email
const sendEmail = (formData) => {
    let { firstName, lastName, company, jobTitle, email, phoneNumber, message } = formData;

    // Setup email data
    let mailOptions = {
        from: 'itz.farhan6710@gmail.com',
        to: 'itz.farhan6710@gmail.com', // Your recipient email address
        subject: 'Test Email',
        text: `
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Company: ${company}\n
            Job Title: ${jobTitle}\n
            Email: ${email}\n
            Phone Number: ${phoneNumber}\n
            Message: ${message}
        `
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
    
const sendRegistrationEmail = (formData) => {
    let { firstName, lastName, company, jobTitle, email, phoneNumber, message, Address, UnionCompany, Prevailing_Wages_Projects, Small_Buisness_Certified, Disabled_Veteran_Buisness_Enterprise } = formData;

    // Setup email data
    let mailOptions = {
        from: 'itz.farhan6710@gmail.com',
        to: 'itz.farhan6710@gmail.com', // Your recipient email address
        subject: 'Test Email',
        text: `
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Company: ${company}\n
            Job Title: ${jobTitle}\n
            Email: ${email}\n
            Phone Number: ${phoneNumber}\n
            Message: ${message}\n
            Address: ${Address}\n
            UnionCompany: ${UnionCompany}\n
            Prevailing Wages Projects: ${Prevailing_Wages_Projects}\n
            Small Buisness Certified: ${Small_Buisness_Certified}\n
            Disabled Veteran Buisness Enterprise: ${Disabled_Veteran_Buisness_Enterprise}\n
        `
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
    
// Define route to handle form submission
app.post('/submit-form', (req, res) => {
    // Extract form data from request body
    const formData = req.body;

    // Call function to send email with form data
    sendEmail(formData);

    // Send response back to client
    res.redirect('/success.html');
});

app.post('/submit-registration-form', (req, res) => {
    // Extract form data from request body
    const formData = req.body;

    // Call function to send email with form data
    sendRegistrationEmail(formData);

    // Send response back to client
    res.send('Form submitted successfully!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

