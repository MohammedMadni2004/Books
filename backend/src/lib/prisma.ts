import { PrismaClient} from "@prisma/client";

function connect() {
  return new PrismaClient();

}

const prisma=connect();   
export default prisma;