// Require packages
const router = require("express").Router();

const { getBirds, getUser, addUser, forumPost, getForum, feedPost, getHomeFeed, getUserFeed, changePhoto, deletePost, deleteForumPost, addBird } = require("../handlers/birdHandlers")

router.get('/birds', getBirds);
router.post('/api/add-bird', addBird);

router.get('/api/get-user/:email', getUser);
router.post('/api/post-user', addUser);

router.post('/api/forum-post', forumPost);
router.get('/api/get-forum', getForum);

router.post('/api/feed-post', feedPost);
router.get('/api/get-homefeed', getHomeFeed);

router.delete('/api/delete-post/:post_id', deletePost);
router.delete('/api/delete-forum-post/:post_id', deleteForumPost);

router.get('/api/get-userfeed/:userName', getUserFeed);
router.patch('/api/change-photo', changePhoto);

module.exports = router;