exports.getPosts = (req, res) => {
    res.json({
        posts: [
            { tittle: 'First posts.' },
            { tittle: 'Second posts.' },
        ]
    });
};