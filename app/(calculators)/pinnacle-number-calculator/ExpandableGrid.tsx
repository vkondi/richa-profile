// Grid.tsx
import React, { useState } from "react";
import styles from "./styles.module.css";
import { PinnacleDataType } from "@/types/types";

interface GridProps {
  data: PinnacleDataType[];
}

const ExpandableGrid: React.FC<GridProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
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
        <React.Fragment key={row.id}>
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
              <p>{row.description}</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExpandableGrid;
