const mongoose = require("mongoose");

const chapter_schema = new mongoose.Schema({
    prof_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    subject: {
        type: String,
        require: true
    },

    class : {
        type: [String],
        require: true
    },

    chapter: {
        type: String,
        require: true
    },

    topics: {
        type: [String],
        require: true
    }
},{timestamps: true});

const chapterschema = new mongoose.model("chapters", chapter_schema);

module.exports = chapterschema;