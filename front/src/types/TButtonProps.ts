type TButtonProps = {
  primaryClass?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  color?: string;
  width?: string;
  heigth?: string;
  type?: "button" | "reset" | "submit";
}

export default TButtonProps;