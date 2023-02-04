const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifyToken")
const verifyMyTodo = require("../middlewares/verifyMyTodo")
const Todo = require("../models/Todo")

router.get("/me", verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ userID : req.user._id })
        res.send(todos)
    } catch ({ message }) { res.status(400).send({message}) }
})

router.post("/", verifyToken, async (req, res) => {
    try {
        const todo = new Todo({ ...req.body, userID : req.user._id })
        await todo.save()
        res.status(201).send(todo)
    } catch ({ message }) { res.status(400).send({message}) }
})

router.put("/:id", verifyToken, verifyMyTodo, async (req, res) => {
    try {
        ["isComplete", "text"].forEach((prop) => req.todo[prop] = req.body[prop])
        const updated = await req.todo.save()
        res.send(updated)
    } catch ({ message }) { res.status(404).send({message}) }
})

router.delete("/me", verifyToken, async (req, res) => {
    try {
        await Todo.deleteMany({ userID : req.user._id})
        res.send()
    } catch ({ message }) { res.status(400).send({message}) } 
})

router.delete("/:id", verifyToken, verifyMyTodo, async (req, res) => {
    try {
        await req.todo.remove()
        res.send()
    } catch ({ message }) { res.status(400).send({message}) }
})



module.exports = router
