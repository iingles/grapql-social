import { buildSchema } from 'graphql'

export const bschema = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData
    }    

    schema {
            query: RootQuery
        }
`)