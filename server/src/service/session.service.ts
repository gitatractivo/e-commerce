import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
import prisma from '../utils/prisma';
import { Request, Response } from "express";
import { Prisma ,Role}  from "@prisma/client";

export async function createSession(
  res: Response,
  user: {
    id: string;
    email: string;
    role: Role;
    emailVerified: Date | null;
    name: string;
  },
  userAgent: string
) {
  const userId = user.id;
  const session = await prisma.session.create({
    data: {
      userId,
      userAgent,
    },
  });
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

  // Set access token cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 3.154e10, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: false,
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: false,
    secure: false,
  });
  res.cookie("user", JSON.stringify(user), {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: false,
    secure: false,
  });
  return session
}

export const setTokensAndCookies = async (
  res: Response,
  user: {
      id:string,
      email:string,
      role:Role,
      emailVerified:Date | null,
      name:string,
    } ,
  session: {
    id: string;
    userAgent: string;
    userId: string;
    valid: boolean;
    createdAt: Date;
    updatedAT: Date;
  } // Replace 'any' with your user type
) => {
  try {
    // Create a session

    // Create access token
    
  } catch (error) {
    throw error;
  }
};

// export async function findSessions(query: FilterQuery<SessionDocument>) {
//   return SessionModel.find(query).lean();
// }

// export async function updateSession(
//   query: FilterQuery<SessionDocument>,
//   update: UpdateQuery<SessionDocument>
// ) {
//   return SessionModel.updateOne(query, update);
// }

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt<{session: string}>(refreshToken);
  if (!decoded || !decoded.session) {
    console.log("session", "return false");
    return false;
  }

  const session = await prisma.session.findFirst({where:{id: decoded.session}});

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ id: session.userId });
  if (!user) return false;

  const accessToken = signJwt(
    {
      ...user,
      session: session.id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}
