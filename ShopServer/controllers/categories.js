const categoryService = require('../services/categories');

exports.getAll = async () => {
    return await categoryService.getAll();
}