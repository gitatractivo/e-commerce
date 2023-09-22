import { Request, Response } from "express";
import logger from "../utils/logger";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req: Request, res: Response) {
  try {
    //create user with verification code
    // const user = await createUser(req.body);

    await sendEmail({
      //   to: user.email,
      from: "test@example.com",
      subject: "Verify your email",
      //   text: `verification code: ${user.verificationCode}. Id: ${user._id}`,
    });

    // return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
