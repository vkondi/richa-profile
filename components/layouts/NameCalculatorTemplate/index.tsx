"use client";

import React, { ChangeEvent, FC, MouseEventHandler, ReactElement } from "react";
import CalculatorWrapper from "@/components/layouts/CalculatorWrapper";
import styles from "./styles.module.css";
import { SystemType } from "@/types/types";
import SystemField from "@/components/SystemField";
import NameField from "@/components/NameField";

type NameCalculatorTemplateProps = {
  title: string;
  onCalculateClick: MouseEventHandler<HTMLDivElement>;
  name: string | undefined;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  system: SystemType | undefined;
  onSystemChange: (arg0: SystemType) => void;
  ResultTiles: ReactElement<unknown, string>;
  resultVisibility: boolean;
};

const NameCalculatorTemplate: FC<NameCalculatorTemplateProps> = ({
  title,
  onCalculateClick,
  name,
  onNameChange,
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

export default NameCalculatorTemplate;
