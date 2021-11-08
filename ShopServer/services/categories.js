const categoryModel = require('../models/CategoryModel');

exports.getAll = async () => {
    return await categoryModel.find();
}