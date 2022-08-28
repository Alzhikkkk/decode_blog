const express = require("express");
const router = express.Router();


const {getCategories} = require("../controllers/category.controller")



router.get('/api/categories', getCategories)


module.exports = router;