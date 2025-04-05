import THeroResponse from "./THeroResponse";

type THomeModalProps = {
    className?: string;
    onSubmit?: () => void;
    hero?: THeroResponse | null,
    onClick?: () => void;
  }
  
export default THomeModalProps;