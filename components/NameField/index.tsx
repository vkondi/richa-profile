import TextInput from "../TextInput/TextInput";
import styles from "./styles.module.css";

type NameFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function NameField({ value, onChange }: NameFieldProps) {
  return (
    <>
      <div className="label">Enter your full name</div>
      <TextInput
        className={styles.textInput}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
