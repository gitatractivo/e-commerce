import Jwt from "jsonwebtoken";
import type {  JwtPayload } from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJwt(object: Object, options?: Jwt.SignOptions | undefined) {
  return Jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
export function verifyJwt<T>(token: string,  ) {
  try {
    const decoded  = Jwt.verify(token, publicKey) as T ;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
