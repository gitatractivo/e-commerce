import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  // console.log("user",user);

  if (!user || user.role!=="ADMIN") {
    return res.sendStatus(403);
  }
  return next();
};

export default requireAdmin;
