import { useState } from "react";
import THomeModalProps from "../../types/THomeModal";
import Button from "../../ui/Buttons";
import MaskedInput from "../../ui/MaskedInputDate";
import THeroRequest from "../../types/THeroRequest";

function HomeModal({
  className,
  onSubmit,
  hero, 
  onClick,
  isEditing }: THomeModalProps) {
    const [formData, setFormData] = useState<THeroRequest>({
        avatar_url: hero?.avatar_url || "",
        name: hero?.name || "",
        nickname: hero?.nickname || "",
        universe: hero?.universe || "",
        main_power: hero?.main_power || "",
        date_of_birth: hero?.date_of_birth
            ? new Date(hero.date_of_birth).toISOString().split("T")[0]
            : "",
        is_active: hero?.is_active || true
    });

    const id = hero?.id || "";

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      const formattedData = {
          ...formData,
          date_of_birth: formData.date_of_birth
            ? formData.date_of_birth.split("/").reverse().join("-")
            : ""
      };
      isEditing ? onSubmit(formattedData, id): onSubmit(formattedData);
    }

    function handleMaskedInputChange  (value: string) {
      setFormData((prev) => ({
          ...prev,
          date_of_birth: value,
      }));
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    return (
        <div className="modal-hero">
            <form onSubmit={handleSubmit} className="modal-hero__form">
                {hero && <img src={hero.avatar_url} className="modal-hero__form__img" alt="" />}

                <div className="modal-hero__form__row1">
                  <label className="modal-hero__form__row1__label">Avatar url</label>
                  <input
                      className="modal-hero__form__row1__input"
                      type="text"
                      name="avatar_url"
                      value={formData.avatar_url}
                      onChange={handleChange}
                      disabled={!hero || hero.is_active ? false: true}
                  />
                </div>
                <div className="modal-hero__form__row1">
                  <label className="modal-hero__form__row1__label">Nome</label>
                  <input
                      className="modal-hero__form__row1__input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!hero || hero.is_active ? false: true}
                  />
                </div>
                <div className="modal-hero__form__row1">
                  <label className="modal-hero__form__row1__label">Apelido</label>
                  <input
                    className="modal-hero__form__row1__input"
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    disabled={!hero || hero.is_active ? false: true}
                  />
                </div>
                <div className="modal-hero__form__row1">
                  <label className="modal-hero__form__row1__label">Universo</label>
                  <input
                      className="modal-hero__form__row1__input"
                      type="text"
                      name="universe"
                      value={formData.universe}
                      onChange={handleChange}
                      disabled={!hero || hero.is_active ? false: true}
                  />
                </div>
                <div className="modal-hero__form__row1">
                  <label className="modal-hero__form__row1__label">Poder</label>
                  <input
                    className="modal-hero__form__row1__input"
                    type="text"
                    name="main_power"
                    value={formData.main_power}
                    onChange={handleChange}
                    disabled={!hero || hero.is_active ? false: true}
                  />
                </div>
                <div className="modal-hero__form__row1">
                    <label className="modal-hero__form__row1__label">Data de nascimento</label>
                    <MaskedInput
                      className={"modal-hero__form__row1__input"}
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleMaskedInputChange}
                      disabled={!hero || hero.is_active ? false: true}
                    />
                </div>
                <div className="modal-hero__form__buttons">
                    <Button
                      onClick={onClick}
                      className="modal-hero__form__buttons__content__button_btn"
                      color="#ff1d44"
                      width="150px"
                    >
                        Fechar
                    </Button>
                    { !hero &&
                      <Button
                        type="submit"
                        className="modal-hero__form__buttons__content__button_btn"
                        color="#56a292"
                        width="150px"
                      >
                        Criar
                     </Button>
                    }

                    { hero && hero.is_active &&
                      <Button
                        type="submit"
                        className="modal-hero__form__buttons__content__button_btn"
                        color="#56a292"
                        width="150px"
                      >
                        Editar
                     </Button>
                    }
                   
                </div>
            </form>
        </div>
    );
}

export default HomeModal;
