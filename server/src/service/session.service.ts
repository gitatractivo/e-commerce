import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
import prisma from "../utils/prisma";

export async function createSession(userId: string, userAgent: string) {
  const resp = await prisma.session.create({
    data: {
      userId,
      userAgent,
    },
  });
  return resp;
}

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
