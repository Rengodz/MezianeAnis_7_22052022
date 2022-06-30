const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.createComment);

module.exports = router;