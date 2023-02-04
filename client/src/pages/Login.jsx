import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { thunks as userThunks } from "../global/slices/usersSlice"
import { useSelector, useDispatch } from "react-redux"
import Overlay from "../components/Overlay"

export default function Login () {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.users)
    
    const [form, setForm] = useState({ email : "", password : ""})
    const onFormChange = (e) => setForm({...form, [e.target.name] : e.target.value})

    const submit = (e) => {
        e.preventDefault()
        dispatch(userThunks.login(form)).unwrap().then(() => nav("/"))
    }

    if (isLoading) return <Overlay text="Logging In"/>
    return (
        <div className="row text-white pt-5">
            <div className="col-12 col-lg-6 mx-auto">
                <form onSubmit={submit} className=" mx-auto">
                    <h2 className="mb-4 text-center">Login</h2>
                    <div className="row gy-4">
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input 
                                onChange={onFormChange} 
                                value={form.email} 
                                name="email" 
                                type="text" 
                                className="form-control" 
                                placeholder="john@gmail.com"
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input 
                                onChange={onFormChange} 
                                value={form.password} 
                                name="password" 
                                type="password" 
                                className="form-control" 
                                placeholder="smith123"
                            />
                        </div>
                    </div>
                    <span onClick={() => nav("/register")} className="text-success my-3 h6 d-block text-center pointer">
                        register here
                    </span>
                    <button disabled={isLoading} type="submit" className="w-100 btn btn-success mt-3">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}