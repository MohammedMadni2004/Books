import { Prisma } from "@prisma/client";

type UserType = Prisma.UserGetPayload<{}>;

export interface CustomRequest extends Request {
  user?: UserType | null;
}
