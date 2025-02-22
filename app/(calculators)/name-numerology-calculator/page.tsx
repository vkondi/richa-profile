"use client";

import React, { useState, useCallback, ChangeEvent, useMemo } from "react";
import CalculatorWrapper from "@/components/CalculatorWrapper";
import TextInput from "@/components/TextInput/TextInput";
import { convertNameToNumber, getSoulUrgeNumber } from "@utils/utility";
import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "@/utils/constants";
import styles from "./styles.module.css";

type ResultCardProps = {
  title: string;
  result: string | number | undefined;
};

type SystemType = "chaldean" | "pythagorean";

const ResultCard: React.FC<ResultCardProps> = ({ title, result }) => (
  <div className={styles.resultCard}>
    <div className={styles.resultCardTitle}>{title}</div>
    <div className={styles.resultCardResult}>{result}</div>
  </div>
);

const NameNumerologyCalculator: React.FC = () => {
  const [system, setSystem] = useState<SystemType>("pythagorean");
  const [name, setName] = useState<string | undefined>();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const handleCalculate = useCallback(() => {
    if (name) {
      setResultVisibility(true);
    }
  }, [name]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setResultVisibility(false);
  }, []);

  const handleSystemChange = useCallback((value: SystemType) => {
    setSystem(value);
    setResultVisibility(false);
  }, []);

  const nameToNumber = useMemo(() => {
    if (name) {
      return convertNameToNumber(
        name,
        system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING
      );
    }
    return undefined;
  }, [name, system]);

  const soulNumber = useMemo(() => {
    if (name) {
      return getSoulUrgeNumber(name, system);
    }
    return undefined;
  }, [name, system]);

  return (
    <CalculatorWrapper label="Name Numerology Calculator">
      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formContainer}>
          {/* Input Field + Label */}
          <div className={styles.label}>Enter your full name</div>
          <TextInput
            className={styles.textInput}
            value={name || ""}
            onChange={handleNameChange}
          />

          {/* System */}
          <div className={styles.label}>System</div>
          <div className={styles.systemOptionContainer}>
            <div
              className={`${styles.systemOption} ${system === "pythagorean" ? styles.systemOptionSelected : ""}`}
              onClick={() => handleSystemChange("pythagorean")}
            >
              Pythagorean
            </div>
            <div
              className={`${styles.systemOption} ${system === "chaldean" ? styles.systemOptionSelected : ""}`}
              onClick={() => handleSystemChange("chaldean")}
            >
              Chaldean
            </div>
          </div>

          {/* Calculate button */}
          <div className={styles.calculateBtn} onClick={handleCalculate}>
            CALCULATE
          </div>
        </div>

        {/* Result */}
        {resultVisibility && (
          <div className={styles.resultContainer}>
            <ResultCard title="Name to number" result={nameToNumber} />
            <ResultCard title="Soul number" result={soulNumber} />
          </div>
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default NameNumerologyCalculator;