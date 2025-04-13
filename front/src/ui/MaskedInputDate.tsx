import { useState, useEffect } from "react";
import TMaskedInputDateProps from "../types/TMaskedInputDateProps";

function MaskedInputDate({ className, value, onChange, name, disabled }: TMaskedInputDateProps) {
  const [dateValue, setDateValue] = useState<string>(value || "");

  // Converte a data no formato "YYYY-MM-DD" para "DD/MM/YYYY"
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split("-");
      setDateValue(`${day}/${month}/${year}`);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (val.length > 8) val = val.slice(0, 8); // Limita a 8 caracteres

    let maskedValue = val;
    if (val.length > 2) maskedValue = `${val.slice(0, 2)}/${val.slice(2)}`;
    if (val.length > 4) maskedValue = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;

    setDateValue(maskedValue);

    // Chama a função de onChange passando o valor sem máscara (YYYY-MM-DD)
    const formattedValue = `${maskedValue.slice(6) || "01"}-${maskedValue.slice(3, 5) || "01"}-${maskedValue.slice(0, 2) || "01"}`;
    onChange(formattedValue); // Envia a data no formato YYYY-MM-DD
  };

  return (
    <input
      type="text"
      value={dateValue}
      onChange={handleChange}
      placeholder="DD/MM/AAAA"
      maxLength={10}
      className={className}
      name={name}
      disabled={disabled}
    />
  );
}

export default MaskedInputDate;
