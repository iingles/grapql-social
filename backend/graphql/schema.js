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
        photoSm: String!
        photoLg: String!
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
        posts(page: Int): PostData!
        user: User!
    }
    
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updateUser(id: ID!, userInput: UserInputData): User!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deleteOnePost(id: ID!): Boolean        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)