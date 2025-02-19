import React from "react";

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customStyles?: React.CSSProperties;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  customStyles,
  className,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={customStyles}
      className={className}
    />
  );
};

export default TextInput;
