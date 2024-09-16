const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware')

//sorry for my english that is very bad

//create a new task
router.post('/createTask', auth, async(req, res) =>{
    const {nameTask} = req.body;
    const userId = req.user._id;

    if(!userId){
        return res.status(400).json({message: 'User ID is required'});
    }

    try{

        const newTask = new Task({nameTask, userId});
        await newTask.save();
        res.json(newTask);

    } catch(err){
        res.status(500).json({message: 'Erro ao criar atividade', error: err.message})
    }

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