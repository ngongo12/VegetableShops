const orderModel = require('../models/OrderModel');

exports.createOrder = async (order) => {
    let item = new orderModel({
        ...order,
        createdAt: new Date(),
        state: 'created',
    });
    console.log(order);
    console.log(item);

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