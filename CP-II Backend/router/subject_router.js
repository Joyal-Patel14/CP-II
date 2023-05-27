const express = require('express');
const router = express.Router();
const path = require('path');
const adminUserAuth = require('../middleware/admin-user-auth');

const subject_controller = require('../controller/subject_controller');
const subjectController = new subject_controller();

router.post('/', adminUserAuth, (req, res) => subjectController.subject_insert(req, res));
router.get('/', adminUserAuth, (req, res) => subjectController.subject_display(req, res));
router.put('/', adminUserAuth, (req, res) => subjectController.subject_update(req, res));
router.delete('/', adminUserAuth, (req, res) => subjectController.subject_delete(req, res));

module.exports = router;