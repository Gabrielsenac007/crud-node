const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    nameTask: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;