import crypto from "crypto";
import nodemailer from "nodemailer";

const createEmailVerificationToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    return {
        rawToken,
        hashedToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    };
};

const getVerificationLink = (token) => {
    const backendUrl = process.env.BACKEND_URL;
    return `${backendUrl}/auth/verify-email?token=${token}`;
};

const createTransporter = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendVerificationEmail = async ({ email, name, token }) => {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        throw new Error("Gmail credentials are not configured");
    }

    const transporter = createTransporter();
    const verificationLink = getVerificationLink(token);

    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `
            <p>Hi ${name || "there"},</p>
            <p>Please verify your email by clicking the link below:</p>
            <p><a href="${verificationLink}">Verify Now</a></p>
            <p>This link will expire in 1 hour.</p>
        `
    });
};

export { createEmailVerificationToken, sendVerificationEmail };
