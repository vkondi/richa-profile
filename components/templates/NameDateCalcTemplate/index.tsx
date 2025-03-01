"use client";

import React, { FC } from "react";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import styles from "./styles.module.css";
import {
  DateCalcTemplateProps,
  NameCalcTemplateProps,
  TemplateProps,
} from "@/types/types";
import SystemField from "@/components/SystemField";
import NameField from "@/components/NameField";
import DateField from "@/components/DateField";

const NameDateCalcTemplate: FC<
  TemplateProps & NameCalcTemplateProps & DateCalcTemplateProps
> = ({
  title,
  onCalculateClick,
  name,
  onNameChange,
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
          {/* Input Field + Label */}
          <NameField value={name || ""} onChange={onNameChange} />

          {/* System */}
          {systemVisibility && !!onSystemChange && (
            <SystemField onSelect={onSystemChange} selectedValue={system} />
          )}

          {/* Date */}
          <DateField
            value={dob}
            onChange={onDOBChange}
            label={dobLabel ?? "Select Date of Birth"}
          />

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

export default NameDateCalcTemplate;
