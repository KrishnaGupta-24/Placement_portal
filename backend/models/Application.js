const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({

    userId: String,

    jobId: String,

    resume: String,

    status: {
        type: String,
        default: "Applied"
    }

});

module.exports = mongoose.model("Application", appSchema);