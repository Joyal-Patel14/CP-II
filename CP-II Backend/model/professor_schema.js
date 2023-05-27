const mongoose = require("mongoose");

const professor_schema = new mongoose.Schema({
    full_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },

    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }
},{timestamps: true});

const professorschema = new mongoose.model("professors", professor_schema);

module.exports = professorschema;
