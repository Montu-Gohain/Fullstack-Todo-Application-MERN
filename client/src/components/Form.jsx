import { useState } from "react"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import { useDispatch, useSelector } from "react-redux"

export default function Form () {
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const { isLoading } = useSelector(s => s.todos)

    const onClick = () => {
        dispatch(todosThunks.createTodo({ text, isComplete : false }))
            .unwrap().then(() =>  setText(""))
    }

    return (
        <form onClick={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control rounded-0" 
                    placeholder="Add Todo Here"
                    disabled={isLoading && (text.length > 0)}
                />
                <button 
                    onClick={onClick} 
                    disabled={text.length === 0}
                    className="btn bg-success text-white rounded-0 fw-bold"
                >
                    Submit
                </button>
            </div>
            <hr/>
        </form>
    )
}