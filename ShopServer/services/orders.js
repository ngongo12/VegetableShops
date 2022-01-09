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
    return await orderModel.findOne({ _id: id });
}

exports.updateOrder = async (id, updateValue) => {
    return await orderModel.updateOne(
        { _id: id },
        { ...updateValue }
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

exports.countOrderAtMonth = async (id, firstDate, lastDate) => {
    const created = await orderModel.count({
        shopID: id,
        createdAt: {
            $gte: firstDate,
            $lt: lastDate
        }
    })

    const confirm = await orderModel.count({
        shopID: id,
        confirmAt: {
            $gte: firstDate,
            $lt: lastDate
        }
    })

    const done = await orderModel.count({
        shopID: id,
        doneAt: {
            $gte: firstDate,
            $lt: lastDate
        }
    })

    const cancel = await orderModel.count({
        shopID: id,
        cancelAt: {
            $gte: firstDate,
            $lt: lastDate
        }
    })

    return {
        created,
        confirm,
        done,
        cancel
    }
}

exports.getTopProductSoldAtMonth = async (id, firstDate, lastDate) => {
    const result = await orderModel.find(
        {
            shopID: id,
            doneAt: {
                $gte: firstDate,
                $lt: lastDate
            }
        },
        '-_id products'
    )

    return result;
}

exports.getAllOrderDoneOnMont = async (id, firstDate, lastDate) => {
    return await orderModel.find(
        {
            shopID: id,
            doneAt: {
                $gte: firstDate,
                $lt: lastDate
            }
        },
        'doneAt'
    )
}