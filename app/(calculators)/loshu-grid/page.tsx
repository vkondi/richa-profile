"use client";

import { useState } from "react";
import { LoshuGrid } from "@/components/LoshuGrid";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import DateField from "@/components/DateField";
import styles from "./styles.module.css";

export default function Home() {
  const [dob, setDob] = useState<string>("");
  const [grid, setGrid] = useState<number[] | null>(null);
  const [numbers, setNumbers] = useState<number[] | null>(null);

  const calculateLoshuGrid = (
    dateString: string
  ): { grid: number[]; numbers: number[] } | null => {
    if (!dateString) return null;

    // Convert date string to numbers
    const dateDigits = dateString.split("-").join("").split("");

    // Calculate the numerology numbers from DOB
    const numerologyNumbers = dateDigits.map((digit) => parseInt(digit, 10));

    // Calculate which positions have numbers
    const positions = Array(9).fill(0);

    numerologyNumbers.forEach((num) => {
      // In Lo Shu Grid, 9 is placed at position 9, not 0
      const position = num === 0 ? 9 : num;
      positions[position - 1]++;
    });
    return { grid: positions, numbers: numerologyNumbers };
  };

  const onDOBChange = (date: string) => {
    setDob(date);
  };

  const onCalculateClick = () => {
    if (dob) {
      const result = calculateLoshuGrid(dob);
      if (result) {
        setGrid(result.grid);
        setNumbers(result.numbers);
      }
    }
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

        {grid && numbers && (
          <div className={styles.resultContainer}>
            <LoshuGrid grid={grid} />
          </div>
        )}
      </div>
    </CalculatorWrapper>
  );
}
