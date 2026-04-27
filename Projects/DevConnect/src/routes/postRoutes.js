const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddlewares');

// PUBLIC
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// PROTECTED
router.post('/', authMiddleware, postController.createPost);
router.patch('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;