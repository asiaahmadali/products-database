const mongoose = require('mongoose') ;
mongoose.connect('mongodb://127.0.0.1:27017/ProductApp') ;

const productSchema = mongoose.Schema({
    productName:String,
    productPrice:Number,
    productImage:String
}) ;

module.exports = mongoose.model('product',productSchema) ;