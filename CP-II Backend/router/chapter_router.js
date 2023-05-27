const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const adminUserAuth = require('../middleware/admin-user-auth');

const chapter_controller = require('../controller/chapter_controller');
const chapterController = new chapter_controller();

router.post('/', adminUserAuth, (req, res) => chapterController.chapter_insert(req, res));
router.get('/', adminUserAuth, (req, res) => chapterController.chapter_display(req, res));
router.put('/', adminUserAuth, (req, res) => chapterController.chapter_update(req, res));
router.delete('/', adminUserAuth, (req, res) => chapterController.chapter_delete(req, res));

module.exports = router;