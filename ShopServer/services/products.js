const productModel = require('../models/ProductModel');

exports.newEmpty = async () => {
    const emptyProduct = new productModel({createdAt: new Date()});
    return await emptyProduct.save();
}

exports.getById = async (id) => {
    return await productModel.findOne({_id: id});
}


exports.update = async (product) => {
    return await productModel.updateOne(
        { _id: product._id },
        { ...product, lastUpdate: new Date() }
    )
}