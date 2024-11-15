const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const verifyRoles = require("../middleware/verifyRoles");
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const filesSizeLimiter = require("../middleware/filiesSizeLimiter");

router
  .route("/")
  .get(verifyRoles("Admin"), agentController.handleAgents)
  .post(verifyRoles("Admin"), agentController.handleCreateAgent)
  .put(verifyRoles("Admin", "Agent"), agentController.handleAgentUpdate)
  .delete(verifyRoles("Admin"), agentController.handleAgentDelete);

router
  .route("/:id")
  .get(verifyRoles("Admin", "Agent"), agentController.handleAgent)
  .put(agentController.handleAgentUpdate)
  .delete(agentController.handleAgentDelete);

router
  .route("/verify/:id")
  .put(verifyRoles("Admin"), agentController.handleVerifyAgent);
router
  .route("/unverify/:id")
  .put(verifyRoles("Admin"), agentController.handleUnVerifyAgent);
router
  .route("/makesuperagent/:id")
  .put(verifyRoles("Admin"), agentController.handleMakeSuperAgent);
router
  .route("/removesuperagent/:id")
  .put(verifyRoles("Admin"), agentController.handleRemoveSuperAgent);
router
  .route("/idupload/:id")
  .put(
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg", ".webp", ".gif"]),
    filesSizeLimiter,
    agentController.handleUploadDocument
  );
module.exports = router;
