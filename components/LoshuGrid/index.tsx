import { FC } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

interface LoshuGridProps {
  digitCount: Record<number, number>;
}

interface GridCellProps {
  cell: {
    number: number;
    count: number;
    presentIcon: string;
    missingIcon: string;
  };
}

const GridCell: FC<GridCellProps> = ({ cell }) => {
  return (
    <div
      className={
        cell?.count > 0
          ? `${styles.gridCell} ${styles.gridCellWithCount}`
          : styles.gridCell
      }
    >
      <div className={styles.cellContent}>
        <Image
          src={cell.count > 0 ? cell.presentIcon : cell.missingIcon}
          alt={cell.count > 0 ? `${cell.number} x ${cell.count}` : "Missing"}
          height={50}
          width={50}
        />

        <div className={styles.countContainer}>
          {/* For count > 0 */}
          {Array(cell.count)
            .fill(0)
            .map((_, index) => (
              <Image
                src="/images/green_tick.svg"
                width={20}
                height={20}
                alt=""
                key={index}
              />
            ))}

          {/* For zero count */}
          {cell.count === 0 && (
            <Image src="/images/red_cross.svg" width={20} height={20} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export const LoshuGrid: FC<LoshuGridProps> = ({ digitCount }) => {
  const gridOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const gridData = gridOrder.map((num) => ({
    number: num,
    count: digitCount?.[num] || 0,
    presentIcon: `/images/${num}_present.svg`,
    missingIcon: `/images/${num}_missing.svg`,
  }));

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className={styles.gridContainer}>
        {gridData.map((cell, index) => (
          <GridCell cell={cell} key={index} />
        ))}
      </div>
    </div>
  );
};
