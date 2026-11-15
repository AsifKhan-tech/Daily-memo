import nodemailer from "nodemailer";

// IMPORT FILE SYSTEM TO READ HTML FILES
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Utility to get current directory path in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Nodemailer talks to an SMTP server (Gmail, Mailtrap, or any other provider).
 *
 * Gmail (smtp.gmail.com):
 * - Port 465 uses implicit TLS, so `secure` must be true.
 * - Port 587 starts plain and upgrades with STARTTLS.
 * - SMTP_PASS is a Google App Password, not the account password.
 *   Spaces in the 16-character app password are ignored.
 * - SMTP_USER and SMTP_FROM_EMAIL must be the same Gmail address
 *   (or a "Send mail as" alias on that account).
 */

const smtpHost = (process.env.SMTP_HOST || "").trim();
const isGmail = smtpHost === "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || (isGmail ? 465 : 587);
const smtpUser = (process.env.SMTP_USER || "").trim();
// Gmail app passwords are shown as "abcd efgh ijkl mnop"; SMTP expects them without spaces.
const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
const fromName = (process.env.SMTP_FROM_NAME || "Daily Memo").trim();
const fromEmail = (process.env.SMTP_FROM_EMAIL || smtpUser).trim();

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  // 465 = TLS from the first byte. 587 / 2525 = STARTTLS after connect.
  secure: smtpPort === 465,
  requireTLS: smtpPort === 587,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

/**
 * Before sending emails, you can verify that Nodemailer can connect to your SMTP server.
 * This is useful for catching configuration errors early.
 *
 */

const mailConfigured = Boolean(smtpHost && smtpUser && smtpPass && fromEmail);

if (!mailConfigured) {
  console.error(
    "Mail is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM_EMAIL in server/.env. For Gmail, SMTP_USER and SMTP_FROM_EMAIL must be the account that owns the app password.",
  );
} else {
  try {
    await transporter.verify();
    console.log(`Mail server is ready (${smtpHost}:${smtpPort})`);
  } catch (err) {
    console.error("Mail server verification failed:", err.message);
  }
}

/**
 
  try {
  const info = await transporter.sendMail({
    from: '"Example Team" <team@example.com>', // sender address
    to: "alice@example.com, bob@example.com", // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
 
 */

//send email
const sendEmail = async (to, subject, html) => {
  if (!mailConfigured) {
    throw new Error(
      "Mail is not configured. Set SMTP_USER and SMTP_FROM_EMAIL to your Gmail address in server/.env.",
    );
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`, // sender address
      to, // list of recipients
      subject, // subject line
      html, // HTML body
    });

    // console.log("Message sent: %s", info);
    //This will notify that email has been sent successfully
    // console.log("Info result: ", info);
    //specific id corresponding to the email
    // console.log("Info result: ", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error while sending mail:", error);
    throw error;
  }
};

//send verification email
const sendVerificationEmail = async (email, token) => {
  try {
    const url = `${process.env.CLIENT_URL}/verify-email/${token}`;

    // 1. Determine the path to the HTML template
    const templatePath = path.join(__dirname, "templates", "verify-email.html");

    // 2. Read the raw HTML file from disk
    let htmlTemplate = await fs.readFile(templatePath, "utf-8");

    // 3. Inject dynamic data: Replace ALL instances of {{URL}} with the actual token URL
    htmlTemplate = htmlTemplate.replaceAll("{{URL}}", url);

    // 4. Send the email with the injected HTML
    await sendEmail(email, "Verify your email", htmlTemplate);

    /*
    await sendEmail(
      email,
      "Verify your email",
      `<h2>Welcome!</h2>
      <p>Click 
      <a href="${url}">here</a>
       to verify your email.
       </p>
      `,
    );
    */
  } catch (error) {
    console.error("Error while sending mail:", error);
    throw error;
  }
};

//send reset password email
const sendResetPasswordEmail = async (email, token) => {
  try {
    const url = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Read the reset password template
    const templatePath = path.join(__dirname, "templates", "reset-password.html");
    let htmlTemplate = await fs.readFile(templatePath, "utf-8");

    // Inject dynamic data
    htmlTemplate = htmlTemplate.replaceAll("{{URL}}", url);

    await sendEmail(email, "Reset your password", htmlTemplate);

    /*
    await sendEmail(
      email,
      "Reset your password",
      `<h2>Password reset!</h2>
      <p>Click 
      <a href="${url}">here</a>
       to reset your password.
       This link will expire in 15 minutes
       </p>
      `,
    );
    */
  } catch (error) {
    console.error("Error while sending mail:", error);
    throw error;
  }
};

export { sendVerificationEmail, sendResetPasswordEmail };
