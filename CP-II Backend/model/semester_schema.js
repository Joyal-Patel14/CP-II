const mongoose = require("mongoose");

const semester_schema = new mongoose.Schema({
    prof_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    year: {
        type: String,
        require: true
    },
    
    semesters: {
        type: [String],
        require: true
    }
},{timestamps: true});

const semesterschema = new mongoose.model("semesters", semester_schema);

module.exports = semesterschema;