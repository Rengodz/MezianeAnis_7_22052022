const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    userId: { type: String, required: true },
    topicText: { type: String, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model('topic', topicSchema);