import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'dumb3@co.co',
            name: 'dumb3',
            posts: {
                create: [
                    {
                        slug: 'content5',
                        title: 'content5',
                        body: 'content5'
                    },
                    {
                        slug: 'content6',
                        title: 'content6',
                        body: 'content6'
                    }
                ]
            }
        }
    });
}

main().catch((e)=> console.log(e)).finally(async()=> await prisma.$disconnect())