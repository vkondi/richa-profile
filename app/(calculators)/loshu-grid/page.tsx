"use client";

import { useState } from "react";
import { LoshuGrid } from "@/components/LoshuGrid";
import Interpretations from "@/components/LoshuGrid/Interpretations";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import DateField from "@/components/DateField";
import styles from "./styles.module.css";
import { getBirthDayNumber, getDestinyNumber } from "@/utils/utility";
import { useRootContext } from "@/context/RootContext";

type DigitCount = Record<number, number>;

export default function Home() {
  const { dob, setDOB } = useRootContext();
  const [digitCount, setDigitCount] = useState<DigitCount | null>(null);

  const onDOBChange = (date: string) => {
    setDOB(date);
    setDigitCount(null);
  };

  const onCalculateClick = () => {
    if (typeof dob !== "string") return;

    const destinyNymber = getDestinyNumber(dob) as number;
    const personalityNumber = getBirthDayNumber(new Date(dob).getDate());
    const digits = dob
      .replace(/[^0-9]/g, "")
      .split("")
      .map(Number);
    const count = digits.reduce(
      (prev: DigitCount, number: number) => {
        return { ...prev, [number]: (prev[number] || 0) + 1 };
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    );

    // Add count for destinyNymber & personalityNumber
    count[destinyNymber] = count[destinyNymber] + 1;
    count[personalityNumber] = count[personalityNumber] + 1;

    setDigitCount(count);
  };

  return (
    <CalculatorWrapper label="Lo Shu Grid Numerology Calculator">
      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formContainer}>
          {/* Date */}
          <DateField
            value={dob}
            onChange={onDOBChange}
            label="Select Date of Birth"
          />

          {/* Calculate button */}
          <div className="calculateBtn" onClick={onCalculateClick}>
            CALCULATE
          </div>
        </div>

        {/* Result container */}
        {digitCount && (
          <div className={styles.resultContainer}>
            <LoshuGrid digitCount={digitCount} />
            <Interpretations digitCount={digitCount} />
          </div>
        )}
      </div>
    </CalculatorWrapper>
  );
}
