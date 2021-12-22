const orderService = require('../services/orders');
const productService = require('../services/products')

exports.createOrder = async (order) => {
    return await orderService.createOrder(order);
}

exports.getOrderByID = async (id) => {
    return await orderService.getOrderByID(id);
}

exports.checkProductsAmount = async (products) => {
    for (p in products) {
        const temp = await productService.getById(p._id);
        if (p?.amount < temp.amount) {
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
            succes: false
        }
    };
    const enoughStock = await this.checkProductsAmount(order.products);
    if (!enoughStock) {
        return {
            message: 'Có 1 vài sản phẩm không đủ số lượng đơn hàng. Hãy kiểm tra lại',
            succes: false
        }
    };

    const result = await orderService.updateOrder(orderID, {
        confirmAt: new Date(),
        state: 'confirm',
    });

    if (result?.acknowledged) {
        for (product in order?.products) {
            await productService.increaseSold(product._id, product.amount);
        }

        return {
            message: 'Đã xác nhận đơn hàng. Hãy chuẩn bị sản phẩm giao đi',
            succes: true
        }
    }

    return {
        message: 'Lỗi.',
        succes: false
    };
}

exports.deliveryOrder = async (uid, orderID) => {
    //Lấy thông tin hóa đơn trong database
    const order = await this.getOrderByID(orderID);
    if (order.shopID != uid) {
        return {
            message: 'Bạn không phải là chủ shop này. Hãy kiểm tra lại thông tin',
            succes: false
        }
    };

    const result = await orderService.updateOrder(orderID, {
        deliveryAt: new Date(),
        state: 'delivery',
    });

    if (result?.acknowledged) {
        return {
            message: 'Xác nhận gửi hàng thành công. Hãy chờ nhận tiền',
            succes: true
        }
    }
    return {
        message: 'Lỗi.',
        succes: false
    };
}

exports.cancelOrder = async (uid, orderID, message) => {
    //Lấy thông tin hóa đơn trong database
    const order = await this.getOrderByID(orderID);

    const result = await orderService.updateOrder(orderID, {
        cancelAt: new Date(),
        state: 'cancel',
        cancelBy: uid,
        cancelReason: message
    });

    if (result?.acknowledged) {
        for (product in order?.products) {
            await productService.increaseSold(product._id, -product.amount); //Hủy đơn hàng thì thay đổi sold và amount về như ban đầu
        }

        return {
            message: 'Đã hủy đơn hàng thành công',
            succes: true
        }
    }
    return {
        message: 'Lỗi.',
        succes: false
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
            succes: true
        }
    }
    return {
        message: 'Lỗi.',
        succes: false
    };
}

exports.getShopOrderByState = async (uid, state) => {
    return await orderService.getShopOrderByState(uid, state);
}

exports.getMyOrderByState = async (uid, state) => {
    return await orderService.getMyOrderByState(uid, state);
}