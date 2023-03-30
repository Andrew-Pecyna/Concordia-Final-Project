// Require packages
const router = require("express").Router();

const { getBirds } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);

module.exports = router;