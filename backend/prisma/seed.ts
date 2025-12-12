
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const ach = await prisma.currency.upsert({
        where: { code: 'ACH' },
        update: {},
        create: {
            code: 'ACH',
            name: 'Recompensa',
            isTradable: true,
        },
    });

    const frg = await prisma.currency.upsert({
        where: { code: 'FRG' },
        update: {},
        create: {
            code: 'FRG',
            name: 'Fragmento',
            isTradable: true,
        },
    });

    console.log('Seeding completed.');
    console.log({ ach, frg });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
