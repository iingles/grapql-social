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
        posts: [Post!]
        photoSm: String
        photoLg: String
        bio: String
        followers: [User!]!
        following: [User!]!
        birthday: String
        status: String 
    }

    type AuthData {
        accessToken: String!
        refreshToken: String!
        userId: String!
    }

    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }

    type Subscription {
        postAdded: Post! 
    }

    input UserInputData {
        email: String!
        firstName: String!
        lastName: String!
        password: String!
        photoSm: String
        photoLg: String
        backgroundImageUrl: String
        bio: String
        birthday: String
        status: String
    }

    input followData {
        _id: ID!
        action: String!
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
        updateFollows(id: ID!, followInput: followData): User!
        updateUser(id: ID!, userInput: UserInputData): User!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deleteOnePost(id: ID!): Boolean        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)