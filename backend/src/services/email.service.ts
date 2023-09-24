import nodemailer, { TransportOptions } from "nodemailer";
import handlebars from "handlebars";
import fs from "node:fs/promises";

import vars from "../config/vars";

const readHTMLFile = async (path: string, callback: CallableFunction) => {
  let res;
  await fs
    .readFile(path, { encoding: "utf-8" })
    .then(async (html) => {
      res = await callback(null, html);
    })
    .catch(async (err) => {
      res = await callback(err);
    });
  return res;
};

export const sendVerificationCode = async (email: string, code: string) => {
  return await readHTMLFile(
    "./src/template/verificationCode.html",
    async (err: any, html: any) => {
      if (err) {
        return false;
      }
      const template = handlebars.compile(html);
      const replacements = {
        code,
        dateYear: new Date().getFullYear(),
      };
      const htmlToSend = template(replacements);

      if (vars.isProd) {
        return await sendEmail(email, "Verification Code", htmlToSend);
      } else {
        return await sendEmailEthereal(email, "Verification Code", htmlToSend);
      }
    }
  );
};

export const sendInvitation = async (email: string, token: string) => {
  return await readHTMLFile(
    "./src/template/invitation.html",
    async (err: any, html: any) => {
      if (err) {
        return false;
      }
      const template = handlebars.compile(html);
      const replacements = {
        actionUrl: `${vars.client.url}/invitation/${token}`,
        dateYear: new Date().getFullYear(),
      };
      const htmlToSend = template(replacements);

      if (vars.isProd) {
        return await sendEmail(email, "Invitation", htmlToSend);
      } else {
        return await sendEmailEthereal(email, "Invitation", htmlToSend);
      }
    }
  );
};

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: vars.email.host,
      port: vars.email.port,
      auth: {
        user: vars.email.username,
        pass: vars.email.password,
      },
      secure: vars.email.secure,
    } as TransportOptions);

    const info: any = await transporter.sendMail({
      from: vars.email.from,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const sendEmailEthereal = async (to: string, subject: string, html: string) => {
  try {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const message = {
      from: vars.email.from,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (err: any) {
    console.error("Failed to create a testing account. " + err.message);
    return false;
  }
};
