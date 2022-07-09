const { default: mongoose } = require("mongoose");
const productApi = require("./dataSource");


/**Database mockup */
let product = [
    {
        id: "53a0724c-a416-4cac-ae45-bfaedce1f147",
        name: "Steel Pot",
        description: "Silver steel pot that is perfect for cooking",
        quantity: 230,
        price: 42.44,
        image: "img-1",
        onSale: false,
        categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
    },
    {
        id: "c2af9adc-d0b8-4d44-871f-cef66f86f7f6",
        name: "Salad Bowl",
        description: "Round wooden bowl perfect for tossing and making salads",
        quantity: 33,
        price: 53.5,
        image: "img-2",
        onSale: false,
        categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
    }
];


const typeDefs = gql`
    
    type Product {
        id: ID,
        name: String,
        description: String,
        quantity: Int,
    }
    type Query {
      product: [Product]
    }
    
    type Mutation {
      createproduct(id:ID,name:String,description:String,quantity:Int): Post # The : indicate the return type of thsi function
      updateproduct(id:ID,name:String,description:String,quantity:Int): String
      deleteproduct(id:ID,name:String,description:String,quantity:Int): String
    }
  `;

/**Resolvers */
const resolvers = {
    Query: {
        products: (_, __, { dataSources }) => {
            return dataSources.postsApi.getProducts();
        },
    },
    Mutation: {

        creatProduct: async (_, { id, name, describtion, quantity, price, onSale }, { dataSources }) => {
            return dataSources.postsApi.createPost({ id, name, describtion, quantity, price, onSale });
        },

        updateProduct: (_, { id, name, describtion, quantity, price, onSale }, { dataSources }) => {
            return dataSources.postsApi.updatePost({ id, name, describtion, quantity, price, onSale });
        },

        deleteProduct: (_, { id }, { dataSources }) => {
            return dataSources.postsApi.deletePost(id);
        },

    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            ProductApi: new productApi()
        }
    }
})

server.listen().then(() => {
    mongoose.connect("mongodb://localhost:27017")
        .then(() => { console.log("Mongo is up and running"); })
})