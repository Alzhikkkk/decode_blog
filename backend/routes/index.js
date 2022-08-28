const express = require('express');
const router = express.Router();

router.use(require('./blog'));
router.use(require('./auth'));
router.use(require('./Category'));
router.use(require('./comment'));




module.exports = router