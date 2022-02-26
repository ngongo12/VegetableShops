const productModel = require('../models/ProductModel');
const mongoose = require('mongoose');

exports.newEmpty = async () => {
    const emptyProduct = new productModel({ createdAt: new Date() });
    return await emptyProduct.save();
}

exports.getById = async (id) => {
    return await productModel.findOne({ _id: id });
}

exports.getWithLimit = async (uid, _startAt, _num) => {
    const startAt = parseInt(_startAt);
    const num = parseInt(_num);
    if (uid) {
        //console.log(uid);
        const products = await productModel
            .find({ owner: { $ne: uid } }, '_id name images sellPrice originPrice owner')
            .skip(startAt)
            .sort({ createdAt: -1 })
            .limit(num);
        return products;
    }
    const products = await productModel
        .find({}, '_id name images sellPrice originPrice')
        .skip(startAt)
        .sort({ createdAt: -1 })
        .limit(num);
    return products;
}

exports.getMyProductsWithLimit = async (uid, startAt, num) => {

    if (uid) {
        //console.log(uid);
        const products = await productModel
            .find({ owner: uid }, '_id name images sellPrice originPrice owner')
            .skip(startAt)
            .sort({ createdAt: -1 })
            .limit(num);
        return products;
    }
    const products = await productModel
        .find({}, '_id name images sellPrice originPrice')
        .skip(startAt)
        .sort({ createdAt: -1 })
        .limit(num);
    return products;
}

exports.getAllShopProducts = async (uid) => {
    const products = await productModel
        .find({ owner: uid }, '_id name images sellPrice originPrice owner sold createdAt nOSeen')
        .sort({ createdAt: -1 });
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
        }, '_id images sellPrice originPrice name')
        .sort({ createdAt: -1 })
        .limit(10);
    return products
}

exports.getMoreProductByCategory = async (id, uid, _startAt) => {
    const startAt = parseInt(_startAt);
    const products = await productModel
        .find({
            categoryId: id,
            owner: { $ne: uid }
        }, '_id images sellPrice originPrice name')
        .limit(startAt)
        .sort({ createdAt: -1 })
        .limit(4);
    return products
}

exports.getProductsInArray = async (arr) => {
    const products = await productModel
        .find({
            _id: { $in: arr }
        },
            '_id name images sellPrice originPrice owner amount expiredAt'
        ).sort({ createdAt: -1 })
    return products;
}

exports.getSalesProducts = async (uid) => {
    const products = await productModel
        .find({
            $where: 'this.sellPrice < this.originPrice',
            owner: { $ne: uid }
        },
            '_id name images sellPrice originPrice owner'
        ).sort({ createdAt: -1 })
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

exports.updateNOSeen = async (id) => {
    let result;
    try {
        result = await productModel.updateOne(
            { _id: id },
            {
                $inc: {
                    nOSeen: 1
                }
            }
        )
    } catch (e) {
        console.log(e);
    }
    return result;
}

exports.search = async (value) => {

    return await productModel.find({
        name: {
            '$regex': value,
            '$options': 'i'
        }
    }).sort({ createdAt: -1 })
}

exports.countProductsOfShop = async (id) => {
    return await productModel.count({ owner: id })
}

exports.sumSold = async (id) => {
    //console.log(id)
    return await productModel.aggregate(
        [
            {
                $match: { owner: new mongoose.Types.ObjectId(id) }
            },
            {
                $group: { _id: id, totalSold: { $sum: "$sold" }, numOfProduct: { $sum: 1 } }
            },
        ]
    )
}

// productModel.updateMany({}, {
//     expiredAt: new Date('2022-03-10')
// }).then(res => console.log(res))
// .catch(e => console.log(e))