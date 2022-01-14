const rateService = require('../services/rates');
// id: { type: ObjectId },
// userID: { type: ObjectId },
// productID: { type: ObjectId },
// orderID: { type: ObjectId },
// createdAt: { type: Date },
// updatedAt: { type: Date }
// rate: { type: Number }
// message: { type: String }
exports.getRate = async (orderID, productID) => {
    return await rateService.getRate(orderID, productID);
}

exports.getRateByOrderID = async (orderID) => {
    return await rateService.getRateByOrderID(orderID);
}

exports.countRate = async (productID) => {
    return await rateService.countRate(productID)
}

exports.saveRate = async (userID, orderID, productID, rate, message) => {
    return await rateService.saveRate(userID, orderID, productID, rate, message)
}

exports.update = async (id, rate, message) => {
    return await rateService.update(id, rate, message)
}