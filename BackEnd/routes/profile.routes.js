const express = require("express");
const upload = require("../middleware/multer.js");
const createProfile = require("../controllers/profile.controller.js");
//const profileValidation = require("../middleware/validate.js");

const router = express.Router();

router.post(
  "/profile",
  upload.single("image"),
  //profileValidation,
  createProfile
);

module.exports = router;
