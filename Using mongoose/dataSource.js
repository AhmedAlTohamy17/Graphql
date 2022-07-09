const { DataSource } = require("apollo-datasource");
const { Product } = require("./model");
const { uuid } = require("uuid")

class productApi extends DataSource {
    initialize(config) {
        this.context = config.context;
    }
    //Getting all products
    async getProducts() {
        return Product.find()
    }
    //creating a product
    async creatProduct({ id, name, describtion, quantity, price, onSale }) {
        const product = new Product({
            id: uuid(),
            name,
            describtion,
            quantity,
            price,
            onSale
        });
        return await product.save()
    }

    async updateProduct({ id, name, describtion, quantity, price, onSale }) {
        const updatedDesiredProduct = await Product.findOneAndUpdate(
            { id },
            { name: name, describtion: describtion, quantity: quantity, price: price, onSale: onSale },
            { new: true }
        )
        if (!updatedDesiredProduct) {
            return "Please check again product ID";
        }
        return "The product has been updated"
    }

    async deleteProduct(id) {
        const deleteDesiredProduct = await Product.findOneAndRemove(id);
        if (!deleteDesiredProduct) {
            return "Please check again product ID"
        }
        return "The product has been deleted"
    }
}
module.exports = productApi;