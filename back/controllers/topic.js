const Topic = require('../models/Topic');
const User = require('../models/User');

exports.createTopic = (req, res, next) => {
    console.log(req.body.topic);
    const topicObject = JSON.parse(req.body.topic);
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
                res.status(200).json({ message: "L'utilisateur dislike lr topic" })
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