import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Post{
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator : User
    createdAt: String!
    updateAt: String!
  }

  type User{
    _id: ID!
    name: String!
    email:String!
    password:String
    status:String
    posts:[Post!]!
  }

  input UserInputData{
    email: String,
    name: String,
    password: String
  }  

type RootMutation{
    signup(userInput: UserInputData):User!
  }

  schema{
    mutation:RootMutation
  }
`);

export default schema;
