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
        //console.log(uid);
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

exports.getMyProductsWithLimit = async (uid, page, num) => {
    
    if(uid)
    {
        //console.log(uid);
        const products = await productModel
            .find({owner: uid } , '_id name images sellPrice originPrice owner')
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
    //console.log(uid);
    const products = await productModel
        .find({
            categoryId: id,
            owner: { $ne: uid }
        }, '_id images')
        .limit(10);
    return products
}

exports.getProductsInArray = async (arr) => {
    const products = await productModel
        .find({
            _id: { $in: arr }
        },
            '_id name images sellPrice originPrice owner amount'
        )
    return products;
}

exports.getSalesProducts = async (uid) => {
    const products = await productModel
        .find({
            $where: 'this.sellPrice < this.originPrice',
            owner: { $ne: uid }
        },
            '_id name images sellPrice originPrice owner'
        )
    return products;
}

exports.increaseSold = async (pid, num) => {
    //console.log('>>>>>>>>>>>>>>>>num ', num)
    await productModel.updateOne(
        { _id: pid },
        {
            $inc: { 
                sold: num,
                amount: -num //Tăng số lượng đã bán và giảm số lượng sản phẩm
            }
        }
    )
}

exports.search = async (value) => {

    return await productModel.find({ name: {
        '$regex': value,
        '$options': 'i'
    }})
}