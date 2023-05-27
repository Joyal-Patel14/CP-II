const mongoose = require("mongoose");

const subject_schema = new mongoose.Schema({
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
    }
},{timestamps: true});

const subjectschema = new mongoose.model("subjects", subject_schema);

module.exports = subjectschema;