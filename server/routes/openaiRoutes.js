const { summaryController } = require("../controllers/openaiController");

const express = require('express')

const router = express.Router();



//route
router.post('/summary',summaryController)

module.exports = router