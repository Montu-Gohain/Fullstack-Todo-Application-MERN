import { useEffect } from "react";
import Form from "../components/Form"
import List from "../components/List"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import { useDispatch, useSelector } from "react-redux";

export default function Home () {
    const dispatch = useDispatch()
    const { numDispatches } = useSelector(s => s.todos)
    useEffect(() => { dispatch(todosThunks.fetchTodos()) }, [numDispatches, dispatch])
    return (
        <div className="row">
            <div className="col-12 col-lg-8 col-xl-6 mx-auto mt-5 p-5 border border-secondary rounded">
                <Form/>
                <List/>         
            </div>  
        </div>
    )
}