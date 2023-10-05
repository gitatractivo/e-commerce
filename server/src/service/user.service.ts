import { omit } from "lodash";
import logger from "../utils/logger";
import prisma from "../utils/prisma";
import { Prisma, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import { verifyJwt } from "../utils/jwt.utils";
import { TokenData } from "../controllers/user.controller";

export async function createUser(input: CreateUserInput) {
  try {
    const exists = await prisma.user.findFirst({
      where: { email: input.email },
    });

    if (exists) {
      throw new Error("User already exists for " + input.email);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = bcrypt.hashSync(input.password, salt);

    const data:(Prisma.Without<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> & Prisma.UserUncheckedCreateInput) | (Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> & Prisma.UserCreateInput) = {
      email: input.email,
      password: hashedPassword,
      name: input.name,
      token: {
        create: {},
      },
    };
    if (input.role === "ADMIN") {
      data.role = Role.ADMIN;
    }

    const user = await prisma.user.create({
      data,
      select: {
        email: true,
        name: true,
        id: true,
        role: true,
        token: {
          select: {
            id: true,
          },
        },
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function validatePassword({ email, password }: LoginUserInput) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt
    .compare(password, user.password)
    .catch((e) => false);

  if (!isValid) {
    throw new Error("Email or Password is Invalid");
  }

  return omit(user, "password");
}

export async function findUser(query: any) {
  return prisma.user.findFirst({
    where: query,
  });
}

export async function verifyUser(token: string) {
  try {
    const { decoded, valid, expired } = verifyJwt<TokenData>(token);

    if (!valid) {
      throw new Error("Invalid Login, Try Again");
    }

    if (expired) {
      throw new Error("Link Expired, Try Logging In");
    }

    const userId = decoded?.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        token: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!!user.emailVerified) {
      throw new Error("Email already verified");
    }

    if (user?.token?.id !== decoded?.tokenId) {
      throw new Error("Email verification failed.. Try Loging In..");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
        token: undefined,
      },
    });

    // Perform the rest of the verification steps here
    // For example, update user verification status

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
