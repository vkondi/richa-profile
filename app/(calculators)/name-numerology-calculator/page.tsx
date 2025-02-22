"use client";

import CalculatorTemplate from "@/components/CalculatorTemplate";
import TextInput from "@/components/TextInput/TextInput";

import { convertNameToNumber, getSoulUrgeNumber } from "@utils/utility";

import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";
import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "@/utils/constants";

type ResultCardProps = {
  title: string;
  result: string | number | undefined;
};

type SystemType = "chaldean" | "pythagorean";

const ResultCard = ({ title, result }: ResultCardProps) => {
  return (
    <div className={styles.resultCard}>
      <div className={styles.resultCardTitle}>{title}</div>
      <div className={styles.resultCardResult}>{result}</div>
    </div>
  );
};

const NameNumerologyCalculator = () => {
  const [system, setSystem] = useState<SystemType>("pythagorean");
  const [name, setName] = useState<string | undefined>();
  const [soulNumber, setSoulNumber] = useState<number | undefined>();
  const [nameToNumber, setNameToNumber] = useState<number | undefined>();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const handleCalculate = () => {
    if (name) {
      setNameToNumber(
        convertNameToNumber(
          name,
          system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING
        )
      );
      setSoulNumber(getSoulUrgeNumber(name, system));
      setResultVisibility(true);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setSoulNumber(undefined);
    setNameToNumber(undefined);
    setResultVisibility(false);
  };

  const handleSystemChange = (value: SystemType) => {
    setSystem(value);
    setSoulNumber(undefined);
    setNameToNumber(undefined);
    setResultVisibility(false);
  };

  return (
    <CalculatorTemplate label="Name Numerology Calculator">
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
          <div>
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
            {/* <ResultCard title="Name to number" result={nameToNumber} /> */}
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
};

export default NameNumerologyCalculator;
