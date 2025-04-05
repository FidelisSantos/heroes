import THomeModalProps from "../../types/THomeModal"
import Button from "../../ui/Buttons"

function HomeModal({
    className,
    onSubmit,
    hero,
    onClick
}:THomeModalProps) {
    return (
        <div className="modal-hero">
            <form onSubmit={onSubmit} className="modal-hero__form">
                {hero && <img src={hero.avatar_url} className="modal-hero__form__img" alt="" />}
                
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Avatar url</label>
                    <input className="modal-hero__form__row1__input" type="text" defaultValue={hero? hero.avatar_url: ""}/>
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Nome</label>
                    <input className="modal-hero__form__row1__input" type="text" defaultValue={hero? hero.name: ""}/>
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Apelido</label>
                    <input className="modal-hero__form__row1__input" type="text" defaultValue={hero? hero.nickname: ""}/>
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Universo</label>
                    <input className="modal-hero__form__row1__input" type="text" defaultValue={hero? hero.universe: ""}/>
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Poder</label>
                    <input className="modal-hero__form__row1__input" type="text" defaultValue={hero? hero.main_power: ""}/>
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Data de nascimento</label>
                    <input className="modal-hero__form__row1__input" type="date" defaultValue={hero?.date_of_birth ? new Date(hero.date_of_birth).toISOString().split("T")[0] : ""}/>
                </div>
                <div className="modal-hero__form__buttons">
                    <Button 
                        onClick={onClick} 
                        className={`modal-hero__form__buttons__content__button_btn`} 
                        color={"#ff1d44"}
                        width="150px"
                    >
                        Fechar
                    </Button>
                    <Button 
                        className={`modal-hero__form__buttons__content__button_btn`} 
                        color={"#56a292"}
                        width="150px"
                    >
                        {hero ? "Editar" : "Criar" }
                    </Button>
                </div>
               
            </form>
        </div>
       
    )
}

export default HomeModal