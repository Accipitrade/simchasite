import nodemailer from 'nodemailer';

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email, name, message } = JSON.parse(event.body);

    // Configure the transporter using modern JavaScript features
    var transporter = nodemailer.createTransport("SMTP", {
        service: "hotmail",
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.OUTLOOK_EMAIL, // Sender address
        to: 'joshslavin98@gmail.com', // Recipient address
        subject: `New Simcha Inquiry from ${email}`, // Subject line
        text: `${name}\n${message}`, // Plain text body
        html: `<p><strong>${name}</strong><br>${message}</p>` // HTML body content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent', id: info.messageId })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
