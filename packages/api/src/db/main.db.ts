// Main database - used to store data related to the users and cosmetics

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
