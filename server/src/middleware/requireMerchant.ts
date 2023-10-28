import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const requireMerchant = (req: Request, res: Response, next: NextFunction) => {
  const user:User = res.locals.user;

  // console.log(user)

  if (!user || user.role==="USER") {
    return res.sendStatus(403);
  }
  return next();
};

export default requireMerchant;
