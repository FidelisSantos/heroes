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
  isEditing,
}: THomeModalProps) {
  const [formData, setFormData] = useState<THeroRequest>({
    avatar_url: hero?.avatar_url || "",
    name: hero?.name || "",
    nickname: hero?.nickname || "",
    universe: hero?.universe || "",
    main_power: hero?.main_power || "",
    date_of_birth: hero?.date_of_birth
      ? new Date(hero.date_of_birth).toISOString().split("T")[0]
      : "",
    is_active: hero?.is_active || true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = hero?.id || "";

  function validate() {
    const newErrors: Record<string, string> = {};
    if(!formData.avatar_url ){
      newErrors.avatar_url = "Url é obrigatório"
    }
    else if ( !/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(formData.avatar_url)) {
      newErrors.avatar_url = "URL do avatar é obrigatória e deve ser válida.";
    }

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Nome não pode conter números.";
    }

    if (!formData.nickname) {
      newErrors.nickname = "Apelido é obrigatório.";
    }

    if (!formData.universe) {
      newErrors.universe = "Universo é obrigatório.";
    }

    if (!formData.main_power) {
      newErrors.main_power = "Poder é obrigatório.";
    }

    if(!formData.date_of_birth ) {
      newErrors.date_of_birth = "Data de nascimento é obrigatório"
    }
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date_of_birth)) {
      console.log(formData.date_of_birth)
      newErrors.date_of_birth = "Data de nascimento deve estar no formato DD/MM/AAAA.";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
  
      setTimeout(() => setErrors({}), 5000);
      return;
    }
  
    setErrors({});
  
    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? formData.date_of_birth.split("/").reverse().join("-")
        : "",
    };
  
    isEditing ? onSubmit(formattedData, id) : onSubmit(formattedData);
  }

  function handleMaskedInputChange(value: string) {
    setFormData((prev) => ({
      ...prev,
      date_of_birth: value,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="modal-hero">
      <form onSubmit={handleSubmit} className="modal-hero__form">
        {hero && <img src={hero.avatar_url} className="modal-hero__form__img" alt="" />}

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Avatar url</label>
          <div className="modal-hero__form__row1__inpt">
            <input
              className={`modal-hero__form__row1__inpt__input ${errors.avatar_url ? "error": ""}`}
              type="text"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-avatar_url"
            />
            {errors.avatar_url && <span id="error-avatar_url" className="modal-hero__form__row1__inpt__error">{errors.avatar_url}</span>}
          </div>
        </div>

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Nome</label>
          <div className="modal-hero__form__row1__inpt">
            <input
              className={`modal-hero__form__row1__inpt__input ${errors.name ? "error": ""}`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-name"
            />
            {errors.name && <span id="error-name" className="modal-hero__form__row1__inpt__error">{errors.name}</span>}
          </div>
        </div>

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Apelido</label>
          <div className="modal-hero__form__row1__inpt">
            <input
              className={`modal-hero__form__row1__inpt__input ${errors.nickname ? "error": ""}`}
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-nickname"
            />
            {errors.nickname && <span id="error-nickname" className="modal-hero__form__row1__inpt__error">{errors.nickname}</span>}
          </div>
        </div>

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Universo</label>
          <div className="modal-hero__form__row1__inpt">
            <input
              className={`modal-hero__form__row1__inpt__input ${errors.universe ? "error": ""}`}
              type="text"
              name="universe"
              value={formData.universe}
              onChange={handleChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-universe"
            />
            {errors.universe && <span id="error-universe" className="modal-hero__form__row1__inpt__error">{errors.universe}</span>}
          </div>
        </div>

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Poder</label>
          <div className="modal-hero__form__row1__inpt">
            <input
              className={`modal-hero__form__row1__inpt__input ${errors.main_power ? "error": ""}`}
              type="text"
              name="main_power"
              value={formData.main_power}
              onChange={handleChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-main_power"
            />
            {errors.main_power && <span id="error-main_power" className="modal-hero__form__row1__inpt__error">{errors.main_power}</span>}
          </div>
        </div>

        <div className="modal-hero__form__row1">
          <label className="modal-hero__form__row1__label">Data de nascimento</label>
          <div className="modal-hero__form__row1__inpt">
            <MaskedInput
              className={`modal-hero__form__row1__inpt__input ${errors.date_of_birth ? "error": ""}`}
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleMaskedInputChange}
              disabled={!hero || hero.is_active ? false : true}
              aria-describedby="error-date_of_birth"
            />
            {errors.date_of_birth && <span id="error-date_of_birth" className="modal-hero__form__row1__inpt__error">{errors.date_of_birth}</span>}
          </div>
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
          {!hero && (
            <Button
              type="submit"
              className="modal-hero__form__buttons__content__button_btn"
              color="#56a292"
              width="150px"
            >
              Criar
            </Button>
          )}
          {hero && hero.is_active && (
            <Button
              type="submit"
              className="modal-hero__form__buttons__content__button_btn"
              color="#56a292"
              width="150px"
            >
              Editar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default HomeModal;
