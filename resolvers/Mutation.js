const { v4: uuid } = require("uuid")

exports.Mutation = {
    addCategory: (parent, { input }, { db }) => {

        const { name } = input

        const newCategory = {
            id: uuid(),
            name
        }
        db.categories.push(newCategory)
        return newCategory
    },
    addProduct: (parent, { input }, { db }) => {
        const { name } = input
        const newProduct = {
            id: uuid(),
            name
        }
        db.Products.push(newProduct)
        return newProduct
    },
    deleteCategory: (parent, { id }, { db }) => {
        db.categories = db.categories.filter((cat) => cat.id !== id);
        db.Products = db.Products.map(pro => {
            if (pro.categoryId === id) return {
                ...pro,
                categoryId: null
            }
            else return pro
        })
        return true
    },
    deleteProduct: (parent, { id }, { db }) => {
        db.Products = db.Products.filter(pro => pro.id !== id);
        db.reviews = db.reviews.filter(rev => rev.productid !== id);
        return true
    },
    updateCategory: (parent, { id, input }, { db }) => {
        const index = db.categories.findIndex(cat => cat.id === id);
        if (index === -1) return null
        db.categories[index] = {
            ...db.categories[index],
            ...input
        }
        return db.categories[index]
    },
    updateProduct: (parent, { id, input }, { db }) => {
        const index = db.Products.findIndex(pro => pro.id === id);
        if (index === -1) return null
        db.Products[index] = {
            ...db.Products[index],
            ...input
        }
        return db.Products[index]
    }
}