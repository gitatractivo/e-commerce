import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser, validatePassword, verifyUser } from "../service/user.service";
import { CreateUserInput, LoginUserInput, VerifyUserInput } from "../schema/user.schema";
import { Omit } from "lodash";
import config from "config";
import sendEmail from "../utils/mailer";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { createSession } from "../service/session.service";
import createHttpError from "http-errors"

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

    const resp = await sendEmail({
      to: user.email,
      from: "gitanshutalwar@gmail.com",
      subject: "Verify your email",
      html: `<p>Click <div href="">${token}</div> to verify your email.</p>`,
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
    if (!req.query.token) {
      return res.status(401).json({ message: "Invalid or expired request" });
    }

    console.log(req)

    //verify token
    const user = await verifyUser(req.query.token);
    console.log("user",user)
    // Create a session

    const session = await createSession(user.id, req.get("user-agent") || "");

    console.log("session",session)

    // Create access token
    const accessToken = signJwt(
      {
        ...user,
        session: session.id,
      },
      { expiresIn: config.get("accessTokenTtl") }
    );
    // Create refresh token
    const refreshToken = signJwt(
      {
        ...user,
        session: session.id,
      },
      { expiresIn: config.get("refreshTokenTtl") }
    );

    // Send refresh & access token back

    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).send({ accessToken, refreshToken ,message: "User verified successfully" });

   

   
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
   
    console.log(req.body)
    //verify token
    const user = await validatePassword(req.body);

    if(user.emailVerified===null){
      return res.status(401).json({ message: "Email not verified" });
    }


    // Create a session

    const session = await createSession(user.id, req.get("user-agent") || "");

    // Create access token
    const accessToken = signJwt(
      {
        ...user,
        session: session.id,
      },
      { expiresIn: config.get("accessTokenTtl") }
    );
    // Create refresh token
    const refreshToken = signJwt(
      {
        ...user,
        session: session.id,
      },
      { expiresIn: config.get("refreshTokenTtl") }
    );

    // Send refresh & access token back

    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    return res
      .status(200)
      .send({
        accessToken,
        refreshToken,
        message: "User verified successfully",
      });

    // Process user verification and response
    // For example, you can update the user's verification status in the database
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ message: error.message });
  }
};



export type TokenData = {
  userId: string; // Change this to the appropriate type for user IDs
  tokenId: string | undefined; // Change this to the appropriate type for token IDs
};
