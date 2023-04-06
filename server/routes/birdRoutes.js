// Require packages
const router = require("express").Router();

const { getBirds, getUser, addUser, forumPost, getForum, feedPost, getHomeFeed, getUserFeed } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);

router.get('/api/get-user/:email', getUser);
router.post('/api/post-user', addUser);

router.post('/api/forum-post', forumPost);
router.get('/api/get-forum', getForum);

router.post('/api/feed-post', feedPost);
router.get('/api/get-homefeed', getHomeFeed);

router.get('/api/get-userfeed/:userName', getUserFeed);

module.exports = router;