import { useState, useEffect } from "react";

interface props {
  placeholder: string,
  isNumber?: boolean,
}

const Input :React.FC<props> = ({ placeholder, isNumber }) => {
  const [value, setValue] = useState<string | number>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    setValue(isNumber && Number(value) || value);
  };

  return (
    <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e)}/>
  )
}

export default Input;
