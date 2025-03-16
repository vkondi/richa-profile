import { FC, useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";

interface LoshuGridInterpretationsProps {
  digitCount: Record<string, number>;
}

interface LoshuGridInterpretation {
  [key: number]: string;
}

interface LoshuInterpretations {
  [key: string]: LoshuGridInterpretation;
}

const LoshuGridInterpretations: FC<LoshuGridInterpretationsProps> = ({
  digitCount,
}) => {
  const { fetchLoshuInterpretations, loshuInterpretations } =
    useRootContext() as {
      fetchLoshuInterpretations: () => void;
      loshuInterpretations: LoshuInterpretations;
    };

  // Fetch Loshu Interpretations on component mount
  useEffect(() => {
    fetchLoshuInterpretations();
  }, [fetchLoshuInterpretations]);

  console.log("digitCount", digitCount);
  console.log("loshuInterpretations", loshuInterpretations);

  const { missing, present } = useMemo(
    () =>
      Object.keys(digitCount ?? {})
        .filter((r) => r != "0")
        .reduce(
          (prev, curr) => {
            const value = digitCount[curr];
            if (value > 0) {
              prev.present[curr] = value;
            } else {
              prev?.missing.push(curr);
            }

            return prev;
          },
          { missing: [] as string[], present: {} as Record<string, number> }
        ),
    [digitCount]
  );

  const presentInterpretations = useMemo(
    () =>
      present &&
      Object.keys(present)
        .map((number) => {
          const count = present[number];
          return {
            number,
            count,
            interpretation: loshuInterpretations?.[number]?.[count],
          };
        })
        .sort((a, b) => b.count - a.count),
    [present, loshuInterpretations]
  );

  const missingInterpretations = useMemo(
    () =>
      missing &&
      missing.map((number) => {
        return {
          number,
          interpretation: loshuInterpretations?.[number]?.[0],
        };
      }),
    [missing, loshuInterpretations]
  );

  return (
    <div className={styles.interpretationContainer}>
      {/* Present numbers */}
      <div className={styles.interpretationTitle}>
        Numbers present in your Lo-shu Grid
      </div>
      {presentInterpretations?.map((interpretation) => (
        <div key={interpretation.number} className={styles.interpretationRow}>
          <span className={styles.interpretationRowTitle}>
            {Array(interpretation.count)
              .fill(interpretation.number)
              .map((_, index) => (
                <span className={styles.interpretationRowNumber} key={index}>
                  {interpretation.number}
                </span>
              ))}
          </span>
          <p className={styles.interpretationRowContent}>
            {interpretation.interpretation}
          </p>
        </div>
      ))}

      {/* Missing numbers */}
      <div className={styles.interpretationTitle}>
        Numbers missing in your Lo-shu Grid
      </div>
      {missingInterpretations?.map((interpretation) => (
        <div key={interpretation.number} className={styles.interpretationRow}>
          <span className={styles.interpretationRowTitle}>
            <span className={styles.interpretationRowNumber}>
              {interpretation.number}
            </span>
          </span>
          <p className={styles.interpretationRowContent}>
            {interpretation.interpretation}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LoshuGridInterpretations;
