const productService = require('../services/products');

exports.newEmpty = async () => {
    const product = await productService.newEmpty();
    if (product) {
        return product._id;
    }
    else {
        return false
    }
}

exports.update = async (product) => {
    const result = await productService.update(product);
    if (result.matchedCount > 0) {
        return {
            result: true,
            message: 'Cập nhật thành công'
        }
    }
    else {
        return {
            result: false,
            message: 'Cập nhật thất bại'
        }
    }
}

exports.getById = async (id) => {
    return await productService.getById(id);
}

exports.getWithLimit = async (uid, startAt, num) => {
    return await productService.getWithLimit(uid, startAt, num);
}

exports.getMyProductsWithLimit = async (uid, startAt, num) => {
    return await productService.getMyProductsWithLimit(uid, startAt, num);
}

exports.getAllShopProducts = async (uid) => {
    return await productService.getAllShopProducts(uid);
}

exports.getTopProductByCategory = async (id, uid) => {
    return await productService.getTopProductByCategory(id, uid);
}

exports.getMoreProductByCategory = async (id, uid, _startAt) => {
    return await productService.getMoreProductByCategory(id, uid, _startAt);
}

exports.getProductsInArray = async (arr) => {
    return await productService.getProductsInArray(arr);
}

exports.getSalesProducts = async (uid) => {
    return await productService.getSalesProducts(uid);
}

exports.search = async (value) => {
    return await productService.search(value);
}

exports.updateNOSeen = async (id) => {
    return productService.updateNOSeen(id);
}

exports.countProductsOfShop = async (id) => {
    return await productService.countProductsOfShop(id);
}

exports.sumSold = async (id) => {
    return await productService.sumSold(id);
}