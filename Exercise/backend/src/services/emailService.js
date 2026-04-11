import crypto from "crypto";
import { Resend } from "resend";

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

const sendVerificationEmail = async ({ email, name, token }) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Resend API key is not configured");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const verificationLink = getVerificationLink(token);

    await resend.emails.send({
        from: process.env.FROM_EMAIL,
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
