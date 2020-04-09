import { buildSchema } from 'graphql'

export const bschema = buildSchema(`
    type Post {
        _id: ID!
        content: String!
        imageUrl: String
        creator: User!
        createdAt: String!
        updatedAt: String!
    }    

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        posts: [Post!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }

    input UserInputData {
        email: String!
        firstName: String!
        lastName: String!
        password: String!
    }

    input PostInputData {
        content: String!
        creatorId: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUser(_id: String!): User!
        posts: PostData!
    }
    
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)