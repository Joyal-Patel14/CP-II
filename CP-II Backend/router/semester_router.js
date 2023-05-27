const express = require('express');
const router = express.Router();
const path = require('path');
const adminUserAuth = require('../middleware/admin-user-auth');

const semester_controller = require('../controller/semester_controller');
const semesterController = new semester_controller();

router.post('/', adminUserAuth, (req, res) => semesterController.semester_insert(req, res));
router.get('/', adminUserAuth, (req, res) => semesterController.semester_display(req, res));
router.put('/', adminUserAuth, (req, res) => semesterController.semester_update(req, res));
router.delete('/', adminUserAuth, (req, res) => semesterController.semester_delete(req, res));

module.exports = router;