const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    describtion: { type: String },
    quantity: { type: Int, required: true },
    price: { type: Int, required: true },
    onSale: { type: Boolean, required: true }
})

const Product = model("product", productSchema);
module.exports = { Product }
