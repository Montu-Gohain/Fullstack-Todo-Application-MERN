import Spinner from "./Spinner";

export default function Overlay ({text="Loading"}) {
    return (
        <div id="overlay">
            <p className="my-3 fs-3 fw-bolder">{text}</p>
            <Spinner color="success" />
        </div>
    )
}