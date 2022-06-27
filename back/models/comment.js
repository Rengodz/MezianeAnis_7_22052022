const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    topicId: { type: String, required: true },
    commentText: { type: String, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model('comment', commentSchema);