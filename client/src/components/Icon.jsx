export default function Icon ({type="", color="primary", classes=[], onClick}) {
    return (
        <i 
            onClick={onClick} 
            className={`bi bi-${type} text-${color} fs-5 pointer ${classes.join(" ")}`}
        />
    )
}