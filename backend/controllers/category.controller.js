const {Category} = require('../models');

console.log(Category);
const getCategories = async (req, res) => {
    const categories = await Category.findAll();
    return res.status(200).send(categories)
}


module.exports = {
    getCategories
}