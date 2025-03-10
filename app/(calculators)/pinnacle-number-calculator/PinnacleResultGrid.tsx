import { FC, Fragment, useState } from "react";
import styles from "./styles.module.css";
import { PinnacleDataType } from "@/types/types";

interface Props {
  data: PinnacleDataType[];
}

const PinnacleResultGrid: FC<Props> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderDescription = (description?: string) => {
    if (!description) return null;

    const split = description.split(".").filter((text) => text.trim() !== "");

    return (
      <ol>
        {split.map((rec, i) => (
          <li key={i}>{rec.trim()}</li>
        ))}
      </ol>
    );
  };

  return (
    <div className={styles.gridContainer}>
      {/* Header Row */}
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>Pinnacle</div>
        <div className={styles.headerCell}>Age Span</div>
        <div className={styles.headerCell}>Number</div>
      </div>

      {/* Data Rows */}
      {data.map((row) => (
        <Fragment key={row.id}>
          <div
            className={`${styles.row} ${expandedRow === row.id ? styles.activeRow : ""}`}
            onClick={() => toggleRow(row.id)}
          >
            <div className={styles.cell}>{row.pinnacle}</div>
            <div className={styles.cell}>{row.ageSpan}</div>
            <div className={styles.cell}>{row.number}</div>
          </div>
          {expandedRow === row.id && (
            <div className={styles.expandedContent}>
              {renderDescription(row.description)}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default PinnacleResultGrid;
