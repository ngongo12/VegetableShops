const productService = require('../services/products');

exports.newEmpty = async () => {
    const product = await productService.newEmpty();
    if(product){
        return product._id;
    }
    else{
        return false
    }
}

exports.update = async ( product ) => {
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

exports.getWithLimit = async (uid, page, num) => {
    return await productService.getWithLimit(uid, page, num);
}

exports.getMyProductsWithLimit = async (uid, page, num) => {
    return await productService.getMyProductsWithLimit(uid, page, num);
}

exports.getTopProductByCategory = async (id, uid) => {
    return await productService.getTopProductByCategory(id, uid);
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