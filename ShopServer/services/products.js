const productModel = require('../models/ProductModel');

exports.newEmpty = async () => {
    const emptyProduct = new productModel({createdAt: new Date()});
    return await emptyProduct.save();
}

exports.getById = async (id) => {
    return await productModel.findOne({_id: id});
}

exports.getWithLimit = async (uid, page, num) => {
    
    if(uid)
    {
        console.log(uid);
        const products = await productModel
            .find({owner: { $ne : uid } }, '_id name images sellPrice originPrice owner')
            .skip((page-1)*num)
            .limit(num);
        return products;
    }
    const products = await productModel
        .find({}, '_id name images sellPrice originPrice')
        .skip((page-1)*num)
        .limit(num);
    return products;
}


exports.update = async (product) => {
    return await productModel.updateOne(
        { _id: product._id },
        { ...product, lastUpdate: new Date() }
    )
}

exports.getTopProductByCategory = async (id, uid) => {
    console.log(uid);
    const products = await productModel
        .find({
            categoryId: id,
            owner: { $ne: uid }
        }, '_id images')
        .limit(10);
    return products
}