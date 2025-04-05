import TButtonProps from "../types/TButtonProps";

function Button ({
  className = "",
  onClick,
  children,
  color= "",
  width= "",
  heigth= "",
  type="button"
}: TButtonProps) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color , width: width, height: heigth}}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
