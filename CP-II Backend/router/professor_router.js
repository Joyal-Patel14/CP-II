const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const adminUserAuth = require('../middleware/admin-user-auth');

const professor_controller = require("../controller/professor_controller");
const professorController = new professor_controller();

router.post("/", (req, res) => professorController.professor_insert(req, res));
router.post("/login", (req, res) => professorController.professor_login(req, res));

module.exports = router;