import THeroRequest from "./THeroRequest";
import THeroResponse from "./THeroResponse";

type THomeModalProps = {
    className?: string;
    onSubmit: (data: THeroRequest,id?: string) => void;
    hero?: THeroResponse | null,
    onClick: () => void;
    isEditing: boolean;
  }
  
export default THomeModalProps;