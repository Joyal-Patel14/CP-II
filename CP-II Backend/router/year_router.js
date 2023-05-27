const express = require('express');
const router = express.Router();
const path = require('path');
const adminUserAuth = require('../middleware/admin-user-auth');

const year_controller = require('../controller/year_controller');
const yearController = new year_controller();

router.post('/', adminUserAuth, (req, res) => yearController.year_insert(req, res));
router.get('/', adminUserAuth, (req, res) => yearController.year_display(req, res));

module.exports = router;
