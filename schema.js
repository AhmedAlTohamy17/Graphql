const { gql } = require("apollo-server")
exports.typeDefs = gql`

type Query {
    hello:[String!]!
    products(filter:productsFilterInput):[Product]
    product(id:ID): Product
    categories:[Category!]!
    category(id:ID!):Category
}
type Mutation{
    addCategory(input:addCategoryInput):Category!
    addProduct(input:addProductInput):Product!
    deleteCategory(id:ID!):Boolean!
    deleteProduct(id:ID):Boolean!
    updateCategory(id:ID!,input:updateCategoryInput):Category
    updateProduct(id:ID,input:updateProductInput):Product
}
type Category{
    name:String
    id:ID
    products(filter:productsFilterInput):[Product!]!
}
type Product{
    id:ID
    name:String!
    describtion:String
    quantity:Int
    price:Float
    onSale:Boolean
    Category: Category
    reviews:[Review!]!
}

type Review{
    id:ID!
    date:String!
    title:String!
    comment:String!
    rating:Int!
}

input productsFilterInput {
    onSale:Boolean
    avgRating:Int
}

input addCategoryInput{
    name:String
}

input addProductInput{
    name:String
}
input updateCategoryInput{
    name:String!
}
input updateProductInput{
    id:ID
    name:String!
    describtion:String
    quantity:Int
    price:Float
    onSale:Boolean
}

`