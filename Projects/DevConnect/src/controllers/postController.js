const Post = require('../models/Post');
let posts = [];

// GET all posts
exports.getAllPosts = (req, res) => {
    res.json({ data: posts });
};

// CREATE post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = await Post.create({
            title,
            content,
            user: req.user.id   
        });

        res.status(201).json({
            message: "Post Created Successfully",
            data: newPost
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.json({
            message: "All posts",
            data: posts
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({
            message: "Post found",
            data: post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        await post.save();

        res.json({
            message: "Post updated",
            data: post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};