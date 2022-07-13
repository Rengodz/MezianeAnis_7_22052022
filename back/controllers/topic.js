const Topic = require('../models/topic');
const User = require('../models/user');

exports.createTopic = (req, res, next) => {

    const topicObject = JSON.parse(req.body.topic);
    console.log(req.body.topic);
    delete topicObject._id;
    const topic = new Topic({
        ...topicObject,
    });
    topic.save()
        .then(() => res.status(201).json({ message: "Topic created" }))
        .catch((error) => res.status(400).json({ message: "Error occured when creating the topic : " + error }));
};

exports.getOneTopic = (req, res, next) => {
    Topic.findOne({
        _id: req.params.id
    }).then(
        (topic) => {
            res.status(200).json(topic);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyTopic = (req, res, next) => {
    const topic = new Topic({
        _id: req.params.id,
        topicText: req.body.name,
        userId: req.body.userId
    });
    Topic.updateOne({ _id: req.params.id }, topic).then(
        () => {
            res.status(201).json({
                message: 'Topic updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteTopic = (req, res, next) => {
    Topic.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllTopics = (req, res, next) => {

    Topic.find().then(
        (topic) => {
            res.status(200).json(topic);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// add comment to a topic fonction
exports.addComment = (req, res, next) => {
    // Retrieve user id and topic from the body
    let userId = req.body.userId;
    let topicId = req.params.id;
    // Construct specific comment object
    let commentObject = {
        user_id: userId,
        date: req.body.date,
        content: req.body.content,
    }
    console.log("userId:" + userId);
    console.log("topicId:" + topicId);
    console.log("commentObject:" + commentObject);
    // Add a comment to the existing topic
    Topic.updateOne({ _id: topicId }, {
            $push: { comments: commentObject },

        })
        .then(() =>
            res.status(200).json({ message: "User posted a comment to a topic successfully!" })
        )
        .catch((error) => res.status(400).json({ message: "Error occured when posting a comment : " + error }));
}


// like fonction
exports.likeTopic = (req, res, next) => {
    let userId = req.body.userId;
    let topicId = req.params.id;
    let like = req.body.like;

    //  us ID on 'usersLiked' and 'likes'

    if (like === 1) {
        Topic.updateOne({ _id: topicId }, {
                $push: { usersLiked: userId },
                $inc: { likes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "L'utilisateur like le topic" })
            )
            .catch((error) => res.status(400).json({ message: "Error occured when updating the topic : " + error }));


        //  dislike 
    } else if (like === -1) {
        Topic.updateOne({ _id: topicId }, {
                $push: { usersDisliked: userId },
                $inc: { dislikes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "L'utilisateur dislike le topic" })
            )
            .catch((error) => res.status(400).json({ error }));


        //  update like/dislike with include

    } else if (like === 0) {
        Topic.findOne({ _id: topicId })
            .then((topic) => {
                if (topic.usersLiked.includes(userId)) {
                    Topic.updateOne({ _id: topicId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                        .then(() =>
                            res.status(200).json({ message: "L'utilisateur a retiré son like" })
                        )
                        .catch((error) => res.status(400).json({ message: "Error occured when updating the topic : " + error }));
                }
                if (topic.usersDisliked.includes(userId)) {
                    Topic.updateOne({ _id: topicId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                        .then(() =>
                            res.status(200).json({ message: "L'utilisateur a retiré son dislike" })
                        )
                        .catch((error) => res.status(400).json({ message: "Error occured when updating the topic : " + error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
}