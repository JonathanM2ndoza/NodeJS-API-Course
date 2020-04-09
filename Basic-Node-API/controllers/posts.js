const Post = require('../models/post');

exports.getPosts = (req, res) => {
    res.json({
        posts: [
            { tittle: 'First posts.' },
            { tittle: 'Second posts.' },
        ]
    });
};

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("Create Post: ", req.body);
    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            post: result
        });
    });
};