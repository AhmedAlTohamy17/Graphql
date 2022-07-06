
const { ApolloServer, gql } = require("apollo-server")
const { Category } = require("./resolvers/Category")
const { Product } = require("./resolvers/Product")
const { Query } = require("./resolvers/Query")
const { typeDefs } = require("./schema")
const { db } = require("./db")
const { Mutation } = require("./resolvers/Mutation")

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Product,
        Mutation
    },
    context: {
        db
    }
})

server.listen().then(({ url }) => {
    console.log("The server is up and runinng at " + url);
})