import { useState, useEffect } from "react";
import TMaskedInputDateProps from "../types/TMaskedInputDateProps";

function MaskedInputDate({ className, value, onChange, name, disabled }: TMaskedInputDateProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split("-");
      setInputValue(`${day}/${month}/${year}`);
    } else {
      setInputValue("");
    }
  }, [value]);

  const formatDate = (val: string) => {
    const digits = val.replace(/\D/g, "");
    let result = "";

    if (digits.length <= 2) result = digits;
    else if (digits.length <= 4) result = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    else result = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;

    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = formatDate(raw);
    setInputValue(masked);

    if (masked.length === 10) {
      const [dd, mm, yyyy] = masked.split("/");
      onChange(`${yyyy}-${mm}-${dd}`);
    } else {
      onChange("");
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
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
