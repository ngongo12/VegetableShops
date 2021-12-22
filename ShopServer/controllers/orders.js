const orderService = require('../services/orders');
const productService = require('../services/products')

exports.createOrder = async (order) => {
    return await orderService.createOrder(order);
}

exports.getOrderByID = async (id) => {
    return await orderService.getOrderByID(id);
}

exports.checkProductsAmount = async (products) => {
    //console.log('>>>>>>>>>>>>>>>>>>>products ',products)
    for (p of products) {
        const temp = await productService.getById(p._id);
        // p của đơn hàng
        // temp của sản phẩm
        //console.log('>>>>>>>>>>>>>>>>>>>temp ', temp)
        if (p?.amount > temp.amount) {
            return false;
        }
    }
    return true;
}

exports.confirmOrder = async (uid, orderID) => {
    //Lấy thông tin hóa đơn trong database
    const order = await this.getOrderByID(orderID);
    if (order.shopID != uid) {
        return {
            message: 'Bạn không phải là chủ shop này. Hãy kiểm tra lại thông tin',
            success: false
        }
    };
    const enoughStock = await this.checkProductsAmount(order.products);
    if (!enoughStock) {
        return {
            message: 'Có 1 vài sản phẩm không đủ số lượng đơn hàng. Hãy kiểm tra lại',
            success: false
        }
    };

    const result = await orderService.updateOrder(orderID, {
        confirmAt: new Date(),
        state: 'confirm',
    });

    if (result?.acknowledged) {
        for (product of order?.products) {
            await productService.increaseSold(product._id, product.amount);
        }

        return {
            message: 'Đã xác nhận đơn hàng. Hãy chuẩn bị sản phẩm giao đi',
            success: true
        }
    }

    return {
        message: 'Lỗi.',
        success: false
    };
}

exports.deliveryOrder = async (uid, orderID) => {
    //Lấy thông tin hóa đơn trong database
    const order = await this.getOrderByID(orderID);
    if (order.shopID != uid) {
        return {
            message: 'Bạn không phải là chủ shop này. Hãy kiểm tra lại thông tin',
            success: false
        }
    };

    const result = await orderService.updateOrder(orderID, {
        deliveryAt: new Date(),
        state: 'delivery',
    });

    if (result?.acknowledged) {
        return {
            message: 'Xác nhận gửi hàng thành công. Hãy chờ nhận tiền',
            success: true
        }
    }
    return {
        message: 'Lỗi.',
        success: false
    };
}

exports.cancelOrder = async (uid, orderID, message) => {
    //Lấy thông tin hóa đơn trong database
    const order = await this.getOrderByID(orderID);
    const lastState = order?.state;
    const result = await orderService.updateOrder(orderID, {
        cancelAt: new Date(),
        state: 'cancel',
        cancelBy: uid,
        cancelReason: message
    });

    if (result?.acknowledged) {
        if (lastState !== 'created')
            for (product of order?.products) {
                await productService.increaseSold(product._id, -product.amount); //Hủy đơn hàng thì thay đổi sold và amount về như ban đầu
            }

        return {
            message: 'Đã hủy đơn hàng thành công',
            success: true
        }
    }
    return {
        message: 'Lỗi.',
        success: false
    };
}

exports.doneOrder = async (uid, orderID) => {

    const result = await orderService.updateOrder(orderID, {
        doneAt: new Date(),
        state: 'done',
        doneBy: uid
    });

    if (result?.acknowledged) {
        return {
            message: 'Đơn hàng đã hoàn thành',
            success: true
        }
    }
    return {
        message: 'Lỗi.',
        success: false
    };
}

exports.getShopOrderByState = async (uid, state) => {
    return await orderService.getShopOrderByState(uid, state);
}

exports.getMyOrderByState = async (uid, state) => {
    return await orderService.getMyOrderByState(uid, state);
}