import { PrismaClient} from "@prisma/client";

function connect() {
  console.log( new PrismaClient());

}

export default connect;
