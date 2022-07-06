const { db } = require("../db");

exports.Product = {
    Category: (parent, args, { db }) => {
        const catID = parent.categoryId;
        return db.categories.find(cat => cat.id === catID)
    },
    reviews: ({ id }, args, { db }) => {
        return db.reviews.filter(rev => rev.productId === id)
    }
}