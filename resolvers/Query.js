const { reviews } = require("../db")

exports.Query = {
    hello: () => {
        return ["bruh", "bruh"]
    },
    products: (parent, { filter }, { db }) => {
        let filterProducts = db.Products

        if (filter) {
            if (filter.onSale === true) {
                filterProducts = filterProducts.filter(pro => { return pro.onSale })
            }
        }
        if ([1, 2, 3, 4, 5].includes(filter.avgRating)) {
            filterProducts = filterProducts.filter((pro) => {
                let sumRating = 0;
                let numberOfReviews = 0;
                db.reviews.forEach(rev => {
                    if (rev.productId === pro.id) {
                        sumRating += rev.rating
                        numberOfReviews++
                    }
                });
                const avgprorating = sumRating / numberOfReviews
                return avgprorating >= filter.avgRating
            })
        }

        return filterProducts
    },
    product: (parent, args, { db }) => {
        const productId = args.id;
        const product = db.Products.find(roduct => roduct.id === productId)
        if (!product) return null;
        return product
    },
    categories: (parent, args, { db }) => {
        return db.categories
    },
    category: (parent, args, { db }) => {
        const catID = args.id
        const cat = db.categories.find(ca => catID === ca.id)
        return cat
    }

}