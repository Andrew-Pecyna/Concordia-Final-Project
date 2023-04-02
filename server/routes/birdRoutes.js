// Require packages
const router = require("express").Router();

const { getBirds, getUser, addUser } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);

router.get('/api/get-user/:email', getUser);
router.post('/api/post-user', addUser);

module.exports = router;