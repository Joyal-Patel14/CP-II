const mongoose = require("mongoose");

const year_schema = new mongoose.Schema({
    prof_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    year: {
        type: String,
        require: true
    }
},{timestamps: true});

const yearschema = new mongoose.model("years", year_schema);

module.exports = yearschema;