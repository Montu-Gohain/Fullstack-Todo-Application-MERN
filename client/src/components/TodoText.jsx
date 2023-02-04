export default function TodoText ({ todo, updateTodoIsComplete }) {    
    return (
        <span 
            onClick={() => updateTodoIsComplete(todo)}  
            id="todo-text"
            className={`pointer ${todo.isComplete ? "text-decoration-line-through" : ""}`}
        >
            {todo.text}
        </span>
    )
}