import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ClearButton from "./ClearButton"
import Spinner from "./Spinner"

export default function Navbar ({title=""}) {
    const nav = useNavigate()
    const { isLoading } = useSelector(s => s.todos)
    return (
        <nav className="navbar bg-dark px-5 py-2 border-bottom">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <span onClick={() => nav("/")} className="navbar-brand text-white pointer me-0 fw-bold">
                       {title}
                    </span>
                </div>
                { isLoading ? <Spinner/> : <ClearButton/>}
            </div>
        </nav>
    )
}