const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    ctc: String,
    skills: [String],   // new
    recruiterId: String,
    deadline: String,   // new
    status: {
        type: String,
        default: "Open"
    }
});

module.exports = mongoose.model("Job", jobSchema);