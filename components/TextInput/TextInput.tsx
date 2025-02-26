import { ChangeEvent, CSSProperties, FC } from "react";

interface TextInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  customStyles?: CSSProperties;
  className?: string;
}

const TextInput: FC<TextInputProps> = ({
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
