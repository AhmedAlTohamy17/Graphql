exports.Category = {
    products: (parent, { filter }, { db }) => {
        const catId = parent.id;
        const catProducts = db.Products.filter((prod) => prod.categoryId === catId)
        let filterProducts = catProducts

        if (filter) {
            if (filter.onsale === true) {
                filterProducts = filterProducts.filter((pro) => {
                    return pro.onSale
                })
            }
        }

        return filterProducts
    }
}