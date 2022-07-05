const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const topicCtrl = require('../controllers/topic');

router.get('/', auth, topicCtrl.getAllTopics);
router.post('/', auth, topicCtrl.createTopic);
router.get('/:id', auth, topicCtrl.getOneTopic);
router.put('/:id', auth, topicCtrl.modifyTopic);
router.put('/', auth, topicCtrl.addComment);
router.delete('/:id', auth, topicCtrl.deleteTopic);
router.post('/:id/like', auth, topicCtrl.likeTopic);

module.exports = router;