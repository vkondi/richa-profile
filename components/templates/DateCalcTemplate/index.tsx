"use client";

import React, { FC } from "react";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import styles from "./styles.module.css";
import { DateCalcTemplateProps, TemplateProps } from "@/types/types";
import SystemField from "@/components/SystemField";
import DateField from "@/components/DateField";

const DateCalcTemplate: FC<DateCalcTemplateProps & TemplateProps> = ({
  title,
  onCalculateClick,
  dob,
  onDOBChange,
  dobLabel,
  systemVisibility,
  system,
  onSystemChange,
  ResultTiles,
  resultVisibility,
}) => {
  return (
    <CalculatorWrapper label={title}>
      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formContainer}>
          {/* Date */}
          <DateField
            value={dob}
            onChange={onDOBChange}
            label={dobLabel ?? "Select Date of Birth"}
          />

          {/* System */}
          {systemVisibility && !!onSystemChange && (
            <SystemField onSelect={onSystemChange} selectedValue={system} />
          )}

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

export default DateCalcTemplate;
