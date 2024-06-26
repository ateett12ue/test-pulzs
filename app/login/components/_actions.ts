"use client";

import prisma from "../../lib/prisma";
import { randomUUID } from "crypto";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { redirect } from "next/navigation";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";
const DOMAIN = process.env.DOMAIN || "localhost:3000";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: API_KEY,
  url: `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}`,
});

export async function resetPassword(data: FormData) {
  const email = await data.get("email");
  if (email) {
    console.log("email from reset password", email);
  }

  if (!email || typeof email !== "string") {
    return {
      error: "Invalid email",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    console.log(user);
  }
  if (!user) {
    return {
      error: "This email is not registered",
    };
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    },
  });

  const messageData = {
    from: `Password Reset <security@${MAILGUN_DOMAIN}>`,
    to: user.email,
    subject: "Reset Password Request",
    text: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: ${PROTOCOL}://${DOMAIN}/password-reset/${token.token}

For security reasons, this link is only valid for four hours.
    
If you did not request this reset, please ignore this email.`,
  };
  try {
    await client.messages.create(MAILGUN_DOMAIN, messageData);
    return undefined; // No error occurred, return undefined
  } catch (error) {
    console.log("Error sending mail:", error);
    return {
      error: "Could not send email. Please try again later.",
    };
  }
  //   await client.messages.create(MAILGUN_DOMAIN, messageData);
  //   redirect("/forgot-password/success");
}
