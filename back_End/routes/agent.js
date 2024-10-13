const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles('Admin'),agentController.handleAgents)
    .post(verifyRoles('Admin'),agentController.handleCreateAgent)
    .put(verifyRoles('Admin', 'Agent'),agentController.handleAgentUpdate)
    .delete(verifyRoles('Admin'),agentController.handleAgentDelete);

router.route('/:id')
    .get(verifyRoles('Admin', 'Agent'),agentController.handleAgent)
    .put(agentController.handleAgentUpdate)
    .delete(agentController.handleAgentDelete);

router.route('/verify/:id')
    .put(verifyRoles('Admin'), agentController.handleVerifyAgent)
router.route('/unverify/:id')
    .put(verifyRoles('Admin'), agentController.handleUnVerifyAgent)
module.exports = router;