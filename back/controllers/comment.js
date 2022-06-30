const Comment = require('../models/comment');
const Topic = require('../models/topic');
const User = require('../models/user');


exports.createComment = (req, res, next) => {

    let userId = req.body.userId;
    let topicId = req.params.id;
    let commentId = req.body.comment;

    const commentObject = JSON.parse(req.body.topic);
    console.log(req.body.comment);
    delete commentObject._id;
    const comment = new Comment({
        ...commentObject,
    });
    comment.save()
        .then(() => res.status(201).json({ message: "Comment posted !" }))
        .catch((error) => res.status(400).json({ message: "Error occured when creating the comment : " + error }));
};