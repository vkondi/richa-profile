"use client";

import CalculatorTemplate from "@/components/CalculatorTemplate";
import TextInput from "@/components/TextInput/TextInput";

import { convertNameToNumber, getSoulUrgeNumber } from "@utils/utility";

import styles from "./styles.module.css";
import { useState } from "react";

const NameNumerologyCalculator = () => {
  const [system, setSystem] = useState<"chaldean" | "pythagorean">("pythagorean");
  const [name, setName] = useState<string | undefined>();

  const handleCalculate = () => {
    if (name) {
      console.log("convertNameToNumber: ", convertNameToNumber(name));
      console.log("getSoulUrgeNumber: ", getSoulUrgeNumber(name));
    }
  };

  return (
    <CalculatorTemplate label="Name Numerology Calculator">
      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formContainer}>
          {/* Input Field + Label */}
          <div>
            <div className={styles.nameLabel}>Enter your full name</div>
            <TextInput
              className={styles.textInput}
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />

            {/* System */}
            <div>
              <div className={styles.systemLabel}>System</div>
              <div className={styles.systemOptionContainer}>
                <div
                  className={`${styles.systemOption} ${system === "pythagorean" ? styles.systemOptionSelected : ""}`}
                  onClick={() => setSystem("pythagorean")}
                >
                  Pythagorean
                </div>
                <div
                  className={`${styles.systemOption} ${system === "chaldean" ? styles.systemOptionSelected : ""}`}
                  onClick={() => setSystem("chaldean")}
                >
                  Chaldean
                </div>
              </div>
            </div>
          </div>

          {/* Calculate button */}
          <div className={styles.calculateBtn} onClick={handleCalculate}>
            CALCULATE
          </div>
        </div>

        {/* Result */}
        <div className={styles.resultContainer}></div>
      </div>
    </CalculatorTemplate>
  );
};

export default NameNumerologyCalculator;
