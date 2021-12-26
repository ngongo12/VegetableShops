const orderService = require('../services/orders');
const productService = require('../services/products');
const notificationController = require('../controllers/notification');

exports.createOrder = async (order) => {
    const result = await orderService.createOrder(order);
    //send notification
    const notification = {
        title: `Đơn hàng mới ${result._id}`,
        body: `Bạn có 1 yêu cầu đặt hàng mới <b>${result?._id}</b>`,
        type: 'order',
        linkID: result?._id,
        image: order?.products[0]?.images[0],
        uid: order?.shopID
    }
    await notificationController.sendNotification(notification, order?.shopID);
    //

    return result;
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
        //send notification
        const notification = {
            title: `Đang giao hàng ${order._id}`,
            body: `Đơn hàng: <b>${order?._id}</b> của bạn đang được giao đi. Hãy chờ nhận hàng`,
            type: 'order',
            linkID: order?._id,
            image: order?.products[0]?.images[0],
            uid: order?.owner
        }
        await notificationController.sendNotification(notification, order?.owner);
        //
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
        //send notification
        if (uid === order?.shopID) {
            const notification = {
                title: `Đã hủy đơn hàng ${order._id}`,
                body: `Đơn hàng: <b>${order?._id}</b> của bạn đã bị hủy bỏ`,
                type: 'order',
                linkID: order?._id,
                image: order?.products[0]?.images[0],
                uid: order?.owner
            }
            await notificationController.sendNotification(notification, order?.owner);
        }
        else{
            const notification = {
                title: `Đã hủy đơn hàng ${order._id}`,
                body: `Đơn hàng: <b>${order?._id}</b> của bạn đã bị hủy bỏ`,
                type: 'order',
                linkID: order?._id,
                image: order?.products[0]?.images[0],
                uid: order?.shopID
            }
            await notificationController.sendNotification(notification, order?.shopID);
        }
        //
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
        if (uid === order?.shopID) {
            const notification = {
                title: `Đã hoàn thành đơn hàng ${order._id}`,
                body: `Đơn hàng: <b>${order?._id}</b> của bạn đã được giao thành công`,
                type: 'order',
                linkID: order?._id,
                image: order?.products[0]?.images[0],
                uid: order?.owner
            }
            await notificationController.sendNotification(notification, order?.owner);
        }
        else{
            const notification = {
                title: `Đã hoàn thành đơn hàng ${order._id}`,
                body: `Đơn hàng: <b>${order?._id}</b> của bạn đã được giao thành công`,
                type: 'order',
                linkID: order?._id,
                image: order?.products[0]?.images[0],
                uid: order?.shopID
            }
            await notificationController.sendNotification(notification, order?.shopID);
        }
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

exports.sendMessage = async (tokens, notification, data) => {
    //console.log('notification controller');
    return await notificationService.sendMessage(tokens, notification, data);
}