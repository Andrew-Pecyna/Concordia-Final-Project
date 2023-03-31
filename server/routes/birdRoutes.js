// Require packages
const router = require("express").Router();

const { getBirds, getUser } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);
router.get('/api/get-user/:email', getUser);

module.exports = router;