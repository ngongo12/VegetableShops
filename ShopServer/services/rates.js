const rateModel = require('../models/RateModel');
const mongoose = require('mongoose');
// id: { type: ObjectId },
// userID: { type: ObjectId },
// productID: { type: ObjectId },
// orderID: { type: ObjectId },
// createdAt: { type: Date },
// updatedAt: { type: Date }
// rate: { type: Number }
// message: { type: String }
exports.getRate = async (orderID, productID) => {
    return await rateModel.find({
        orderID,
        productID
    })
}

exports.getRateByOrderID = async (orderID) => {
    return await rateModel.find({ orderID })
}


exports.countRate = async (productID) => {
    return await rateModel.aggregate(
        [
            {
                $match: { productID: new mongoose.Types.ObjectId(productID) }
            },
            {
                $group: { _id: productID, totalRate: { $sum: "$rate" }, numOfRate: { $sum: 1 } }
            },
        ]
    )
}

exports.saveRate = async (userID, orderID, productID, rate, message) => {
    const date = new Date();
    const item = new rateModel({
        productID,
        orderID,
        userID,
        rate,
        message,
        createdAt: date,
        updatedAt: date
    })
    return await item.save();
}

exports.update = async (id, rate, message) => {
    const date = new Date();
    return await rateModel.updateOne({ _id: id }, {
        rate,
        message,
        updatedAt: date
    })
}

exports.getReview = async (pid) => {
    return await rateModel.aggregate([
        {
            $match: { productID: new mongoose.Types.ObjectId(pid) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                // pipeline: [
                //     {
                //         $match: { productID: new mongoose.Types.ObjectId(pid) }
                //     }
                // ],
                as: 'users'
            }
        }
    ])
}