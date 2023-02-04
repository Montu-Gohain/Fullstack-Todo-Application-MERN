export default function Spinner ({ color="success" }) {
    return (
        <div className={`spinner-border text-${color}`} role="status"/>
    )
}