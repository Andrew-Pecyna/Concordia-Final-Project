// Require packages
const router = require("express").Router();

const { getBirds, getUser, addUser, forumPost, getForum } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);

router.get('/api/get-user/:email', getUser);
router.post('/api/post-user', addUser);

router.post('/api/forum-post', forumPost);
router.get('/api/get-forum', getForum);

module.exports = router;