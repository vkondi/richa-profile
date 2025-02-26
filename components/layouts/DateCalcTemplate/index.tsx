"use client";

import React, { FC, MouseEventHandler, ReactElement } from "react";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import styles from "./styles.module.css";
import { SystemType } from "@/types/types";
import SystemField from "@/components/SystemField";
import DateField from "@/components/DateField";

type DateCalcTemplateProps = {
  title: string;
  onCalculateClick: MouseEventHandler<HTMLDivElement>;
  dob: string | undefined;
  onDOBChange: (date: string) => void;
  systemVisibility?: boolean;
  system: SystemType | undefined;
  onSystemChange: (arg0: SystemType) => void;
  ResultTiles: ReactElement<unknown, string>;
  resultVisibility: boolean;
};

const DateCalcTemplate: FC<DateCalcTemplateProps> = ({
  title,
  onCalculateClick,
  dob,
  onDOBChange,
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
          <DateField value={dob} onChange={onDOBChange} />

          {/* System */}
          {systemVisibility && (
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
