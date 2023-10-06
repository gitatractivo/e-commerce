import { Request, Response } from "express";
import log from "../utils/logger";
import { changePassword, createNewToken, createUser, findUser, validatePassword, verifyForgotUser, verifyUser } from "../service/user.service";
import { CreateUserInput, LoginUserInput, ForgotPasswordInput, VerifyUserInput, ChangePasswordInput } from "../schema/user.schema";
import { Omit, omit } from 'lodash';
import config from "config";
import sendEmail from "../utils/mailer";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { createSession, setTokensAndCookies } from "../service/session.service";
import createHttpError from "http-errors"
import { Role } from "@prisma/client";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    const tokenData: TokenData = {
      userId: user.id,
      tokenId: user?.token?.id,
    };

    const token = signJwt(tokenData, {
      expiresIn: config.get("accessTokenTtl"),
    });
    // const verificationLink = `http://yourwebsite.com/verify/${token}`;

    const url = new URL("http://localhost:3000/verify");
    url.searchParams.set("token",token);

    const resp = await sendEmail({
      to: user.email,
      from: "gitanshutalwartest@gmail.com",
      subject: "Verify your email",
      html: `<h1> <a href=${url}>Click here</a> to verify your email.</h1>`,
    });
    return res.status(201).json({
      message: "Verify Email to Continue...",
    });
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ message: error.message });
  }
};

export const verifyUserHandler = async (
  req: Request<{}, {}, {}, VerifyUserInput>,
  res: Response
) => {
  try {
    if (!req.query.token ) {
      return res.status(401).json({ message: "Invalid or expired request" });
    }

    console.log(req)

    //verify token
    const user = await verifyUser(req.query.token);
    console.log("user",user)
    // Create a session

    const session = await createSession(res, user, req.get("user-agent") || "");

    
    return res.status(200).send({message: "User verified successfully" });

   

   
  } catch (error: any) {
    log.error(error.message)
    return res.status(409).json({ error: error.message });
  }
};


export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  try {
   
    //verify token
    const user:{
      id:string,
      email:string,
      role:Role,
      emailVerified:Date | null,
      name:string,
    } = await validatePassword(req.body);

    if(user.emailVerified===null){
      return res.status(401).json({ message: "Email not verified" });
    }


    // Create a session

    const session = await createSession(res,user, req.get("user-agent") || "");

    
    return res
      .status(200)
      .send({
        message: "User verified successfully",
      });

    
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ message: error.message });
  }
};
export const forgotPasswordUserHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  try {
   
    const user = await findUser({email:req.body.email});
    if(!user){
      return res.status(401).json({ message: "User not found" });
    }

    const updatedUser = await createNewToken(user.id);

    const tokenData: TokenData = {
      userId: updatedUser.id,
      tokenId: updatedUser?.token?.id,
    };

    
    const token = signJwt(tokenData, {
      expiresIn: config.get("accessTokenTtl"),
    });
    // const verificationLink = `http://yourwebsite.com/verify/${token}`;

    const url = new URL("http://localhost:3000/verify");
    url.searchParams.set("token", token);
    url.searchParams.set("password","true");

    
    const resp = await sendEmail({
      to: user.email,
      from: "gitanshutalwartest@gmail.com",
      subject: "Verify your email",
      html: `<h1> <a href=${url}>Click here</a> to verify email and change password.</h1>`,
    });
    return res.status(201).json({
      message: "Verify Email to Continue...",
    });

    
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ message: error.message });
  }
};


export const verifyForgotPasswordUserHandler = async (
  req: Request<{}, {}, {}, VerifyUserInput>,
  res: Response
) => {
  try {
    if (!req.query.token) {
      return res.status(401).json({ message: "Invalid or expired request" });
    }


    //verify token
    const user = await verifyForgotUser(req.query.token);

    if(!user){
      return res.status(401).json({ message: "Something went wrong try again" });
    }

    const session = await createSession(res, user, req.get("user-agent") || "");
    

    return res.status(200).send({ message: "User verified successfully" });
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ error: error.message });
  }
};
export const changePasswordUserHandler = async (
  req: Request<{}, {},  ChangePasswordInput>,
  res: Response
) => {
  try {

    const user = res.locals.user;

    if(!user){
      return res.status(401).json({ message: "Invalid or expired request" });
    }
    const updatedUser = await changePassword(user.id,req.body.password);


    
    //verify token
    
    

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ error: error.message });
  }
};






export type TokenData = {
  userId: string; // Change this to the appropriate type for user IDs
  tokenId: string | undefined; // Change this to the appropriate type for token IDs
};
