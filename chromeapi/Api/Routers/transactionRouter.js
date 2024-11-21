const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();
router.post('/log', authController.logTransaction);
router.get('/', authController.getTransactions);

module.exports = router;
