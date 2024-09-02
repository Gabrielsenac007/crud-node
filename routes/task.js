const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//sorry for my english that is very bad

//create a new task
router.post('/createTask', async(req, res) =>{
    const {nameTask} = req.body;
    const newTask = new Task({nameTask});
    await newTask.save();
    res.json(newTask);
})


//view all tasks
router.get('/allTasks', async(req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
})

//edit a task
router.put('/editTask/:id', async(req, res) =>{
    const {nameTask} = req.body;
    const updateNameTask = await Task.findByIdAndUpdate(req.params.id, {nameTask}, {new: true});
    res.json(updateNameTask);
})


//delete a task
router.delete('/deleteTask/:id', async(req,res) =>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: "Tarefa deletada com sucesso!"})
})


module.exports = router;