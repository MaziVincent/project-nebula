const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.route('/')
    .get(messageController.handleGetMessages)
    .post(messageController.handleNewMessage)

router.route('/sender/:id')
    .get(messageController.handleGetMessageBySender)

router.route('/receiver/:id')
    .get(messageController.handleGetMessageByReceiver)
router.route('/:id')
    .get(messageController.handleGetMessage)
    .delete(messageController.handleDeleteMessage)

module.exports = router;