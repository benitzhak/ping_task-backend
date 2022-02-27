const express = require("express");
const { pingRequest , getPings} = require("./ping-controller");
const router = express.Router();

router.post("/:url/:count", pingRequest);
router.get("/", getPings);

module.exports = router;
