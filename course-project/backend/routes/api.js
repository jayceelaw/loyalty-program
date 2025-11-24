'use strict';

const express = require('express'); 
const router = express.Router(); 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config(); 
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// email reset password token to user
router.post('/email', async (req, res) => {
    const { toEmail, resetToken } = req.body;

    const msg = {
        to: toEmail, 
        from: 'loyaltyprogram309@gmail.com', 
        subject: 'Reset Your Password',
        html: `<p>You requested a password reset. Please use the reset token below within 60 minutes to reset your password.</p> \
            <p>Reset token: <b>${resetToken}</b></p>`
    }

    sgMail.send(msg)
        .then(() => {
            return res.send({ message: "email sent successfully" });
        })
        .catch((error) => {
            return res.status(400).send({ message: error });
        })
});

module.exports = router;
