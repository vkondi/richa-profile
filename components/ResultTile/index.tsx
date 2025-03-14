import { INTERPRETATION } from "@/types/types";
import styles from "./styles.module.css";
import { usePopupContext } from "@/context/PopupContext";
import { useRootContext } from "@/context/RootContext";
import { FC } from "react";

type ResultTileProps = {
  title: string;
  result: string | number | undefined;
  type: INTERPRETATION;
};

const ResultTile: FC<ResultTileProps> = ({ title, result, type }) => {
  const { setOpen, isOpen, setTitle, setContent } = usePopupContext();
  const { getInterpretation } = useRootContext();

  const handleClick = () => {
    if (type && typeof result === "number") {
      // Retrieve interpretation for the type/number(result) combination
      const interpretation = getInterpretation(type, result as number);

      // Show the popup if interpretation is found
      if (interpretation) {
        setTitle(`${title} - ${result}`);
        setContent(interpretation?.description ?? "");
        setOpen(!isOpen);
      }
    }
  };

  return (
    <div className={`${styles.resultTile} boxShadow`} onClick={handleClick}>
      <div className={styles.resultTileTitle}>{title}</div>
      <div className={styles.resultTileResult}>{result}</div>
    </div>
  );
};

export default ResultTile;
