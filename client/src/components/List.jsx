import { useDispatch, useSelector } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import Empty from "./Empty"
import Icon from "./Icon"
import TodoText from "./TodoText"

export default function List () {
    const dispatch = useDispatch()
    const { todos, isLoading } = useSelector((s) => s.todos)

    const funcs = {
        deleteTodo(todo, index) {
            if (window.confirm(`Delete Item #${index+1}`)) dispatch(todosThunks.deleteTodo(todo))
        },
        updateTodoText(todo) {
            const text = prompt("Update Text:", todo.text)
            if (text) dispatch(todosThunks.updateTodo({ ...todo, text }))
        },
        updateTodoIsComplete(todo) {
            dispatch(todosThunks.updateTodo({ ...todo, isComplete : !todo.isComplete }))
        }
    }
    
    if ((todos.length === 0) && !isLoading) return <Empty/>
    return (
        <ul id="list" className="list-group rounded-0 pb-3">
            {todos.map((todo, index) => (
                <li 
                    key={todo._id} 
                    className="list-group-item d-flex justify-content-between align-items-center"
                >
                    <TodoText todo={todo} updateTodoIsComplete={funcs.updateTodoIsComplete} />
                    <div>
                        <Icon 
                            onClick={() => funcs.updateTodoText(todo)} 
                            type="pencil-square" 
                            color="warning" 
                            classes={["me-3"]} 
                        />
                        <Icon 
                            onClick={() => funcs.deleteTodo(todo, index)} 
                            type="trash" 
                            color="danger" 
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}