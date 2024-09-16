const mongoose = require("mongoose");
const User = require("./User");

const TaskSchema = new mongoose.Schema({
    nameTask: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;