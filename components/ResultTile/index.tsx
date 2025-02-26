import styles from "./styles.module.css";

type ResultTileProps = {
  title: string;
  result: string | number | undefined;
};

const ResultTile: React.FC<ResultTileProps> = ({ title, result }) => (
  <div className={`${styles.resultTile} boxShadow`}>
    <div className={styles.resultTileTitle}>{title}</div>
    <div className={styles.resultTileResult}>{result}</div>
  </div>
);

export default ResultTile;
