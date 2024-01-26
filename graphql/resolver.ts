import prisma from "@/db"

export const resolvers = {
    Query: {
        posts: async()=> await prisma.post.findMany(),
        users: async()=> await prisma.user.findMany(),
        post: async (parent: Object,args: { id: string }, ctx: Object) => {
            const posts = await prisma.post.findMany()
            return posts.find((post) => post.id === args.id)
        },
        user: async (parent: Object,args: { id: string }, ctx: Object) => {
            const users = await prisma.user.findMany()
            return users.find((user) => user.id === args.id)
        }
    },
    User: {
        posts: async(parent: { id: string }) => {
            const posts = await prisma.post.findMany()
            return posts.filter((post) => post.userId === parent.id)
        }
    },
    Post: {
        user: async (parent: { userId: string }) => {
            const users = await prisma.user.findMany()
            return users.find((user) => user.id === parent.userId)
        }
    },
    Mutation: {
        deletePost: async(_: any,args: { id: string }) => {
            await prisma.post.delete({
                where: {
                    id: args.id
                }
            })
            return await prisma.post.findMany()
        },
        addPost: async(_: any,args: { post: {  slug: string, title: string, body: string, userId: string  } }) => {
            return await prisma.post.create({
                data: {
                    slug: args.post.slug,
                    title: args.post.title,
                    body: args.post.body,
                    userId: args.post.userId
                }
            })
        },
        editPost: async(_: any,args: { id: string, edit: {  slug: string, title: string, body: string } }) => {
            return await prisma.post.update({
                where: {
                    id: args.id
                },
                data: {
                    slug: args.edit.slug,
                    title: args.edit.title,
                    body: args.edit.body,
                }
            })
        }
    }
}