import TCardProps from "../types/TCardProps";

function Card({
    children,
    onClick,
    className = ""
}:TCardProps) {
    return (
        <div className={`card ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default Card;