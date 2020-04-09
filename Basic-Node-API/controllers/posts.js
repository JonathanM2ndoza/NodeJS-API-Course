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
    post.save()
        .then(result => {
            res.status(200).json({
                post: result
            });
        })
};