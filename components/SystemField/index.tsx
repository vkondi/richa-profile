import { SystemType } from "@/types/types";
import styles from "./styles.module.css";

type SystemFieldProps = {
  onSelect: (system: SystemType) => void;
  selectedValue: SystemType | undefined;
};

export default function SystemField({
  onSelect,
  selectedValue,
}: SystemFieldProps) {
  return (
    <>
      <div className={styles.label}>System</div>
      <div className={styles.systemOptionContainer}>
        <div
          className={`${styles.systemOption} ${selectedValue === "pythagorean" ? styles.systemOptionSelected : ""}`}
          onClick={() => onSelect("pythagorean")}
        >
          Pythagorean
        </div>
        <div
          className={`${styles.systemOption} ${selectedValue === "chaldean" ? styles.systemOptionSelected : ""}`}
          onClick={() => onSelect("chaldean")}
        >
          Chaldean
        </div>
      </div>
    </>
  );
}
