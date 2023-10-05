import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";
import logger from "./logger";

// export async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});



async function sendEmail(payload: SendMailOptions) {
  console.log(payload)
  try {
    
    transporter.sendMail(payload, (err, info) => {
      if (err) {
        log.error(err, "Error sending email");
        return;
      }
  
      log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
  } catch (error) {
    log.error(`Email error:${error}`)
  }
}

export default sendEmail;
