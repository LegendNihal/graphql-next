export const typeDefs = `
    type Post {
        id: String!
        slug: String!
        title: String!
        body: String!
        user: User!
    }
    type User {
        id: String!    
        email: String!    
        name: String!
        posts: [Post!]
    }
    type Query {
        posts: [Post]!
        users: [User]!
        post(id: String!): Post
        user(id: String!): User
    }
    type Mutation {
        addPost(post: addPostInput!): Post
        editPost(id: String!, edit: editPostInput!): Post
        deletePost(id: String!): [Post]
    }
    input addPostInput {
        slug: String!
        title: String!
        body: String!
        userId: String!
    }
    input editPostInput {
        slug: String
        title: String
        body: String
    }
`;