"use client";
// CalculatorWrapper.jsx

import React, { FC, PropsWithChildren } from "react";

import styles from "./styles.module.css";

interface CalculatorWrapperProps {
  label: string;
}

const CalculatorWrapper: FC<PropsWithChildren<CalculatorWrapperProps>> = ({
  label,
  children,
}) => {
  return (
    <div className={styles.container}>
      {/* Top Div */}
      <div className={styles.calculatorTemplateTopDiv}>{label}</div>

      {/* Middle Div */}
      <div className={styles.calculatorTemplateMiddleDiv}>{children}</div>
    </div>
  );
};

export default CalculatorWrapper;
