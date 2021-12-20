const orderModel = require('../models/OrderModel');

exports.createOrder = async (order) => {
    let item = new orderModel({
        ...order,
        createdAt: new Date(),
        state: 'created',
    });

    return await item.save();
}

exports.getOrderByID = async (id) => {
    return await orderModel.findOne({_id: id});
}

exports.updateOrder = async (id, updateValue) => {
    return await orderModel.updateOne(
        {_id: id},
        { ...updateValue}
    )
}

exports.getShopOrderByState = async (uid, state) => {
    return await orderModel.find(
        { 
            shopID: uid,
            state: state
        },
    )
}

exports.getMyOrderByState = async (uid, state) => {
    return await orderModel.find(
        { 
            owner: uid,
            state: state
        }
    )
}