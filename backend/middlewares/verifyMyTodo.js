const { Types } = require("mongoose")
const Todo = require("../models/Todo")

module.exports = async function verifyMyTodo (req, res, next) {
    try {
        if (!Types.ObjectId.isValid(req.params.id)) throw new Error("Object ID is invalid")
        const todo = await Todo.findById(req.params.id)
        if (todo.userID.toString() !== req.user._id.toString()) throw new Error("Can only update your own todos")
        req.todo = todo
        next()
    }  catch ({ message }) { res.status(403).send({message})}
}