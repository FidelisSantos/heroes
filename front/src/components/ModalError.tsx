import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../ui/Buttons";
import { clearError } from "../store/hero/slice";

function ModalError() {

  const dispatch = useDispatch();
  const {error, errorMessage} = useSelector((state: RootState) => state.hero);

  if (!error || !errorMessage) return null;
  console.log("ModalError renderizou", new Date().toISOString());
  console.log(errorMessage);

  const messages = errorMessage.split(";").map((msg) => msg.trim()).filter(Boolean);
  console.log(messages[0])

  return (
    <div className="modal">
      <div className="modal-error">
        <div className="modal-error__content">
          {messages.map((text, idx) => (
            <p className="modal-error__content__text" key={idx}>{text}</p>
          ))}
        </div>
        <Button 
        onClick={() => dispatch(clearError())}
        color="#56a292"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
}

export default ModalError;
