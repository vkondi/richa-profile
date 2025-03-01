"use client";

import React, { FC } from "react";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import styles from "./styles.module.css";
import { NameCalcTemplateProps, TemplateProps } from "@/types/types";
import SystemField from "@/components/SystemField";
import NameField from "@/components/NameField";

const NameCalcTemplate: FC<NameCalcTemplateProps & TemplateProps> = ({
  title,
  onCalculateClick,
  name,
  onNameChange,
  system,
  onSystemChange = () => {},
  ResultTiles,
  resultVisibility,
}) => {
  return (
    <CalculatorWrapper label={title}>
      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formContainer}>
          {/* Input Field + Label */}
          <NameField value={name || ""} onChange={onNameChange} />

          {/* System */}
          <SystemField onSelect={onSystemChange} selectedValue={system} />

          {/* Calculate button */}
          <div className="calculateBtn" onClick={onCalculateClick}>
            CALCULATE
          </div>
        </div>

        {/* Result */}
        {resultVisibility && (
          <div className={styles.resultContainer}>{ResultTiles}</div>
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default NameCalcTemplate;
