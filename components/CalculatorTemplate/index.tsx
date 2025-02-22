"use client";
// CalculatorTemplate.jsx

import React, { FC, PropsWithChildren, useCallback } from "react";
import { usePathname } from "next/navigation";

import CalculatorLogo from "./CalculatorLogo";

import { CALCULATOR_LINKS } from "@utils/constants";

import styles from "./styles.module.css";

interface CalculatorTemplateProps {
  label: string;
}

const CalculatorTemplate: FC<PropsWithChildren<CalculatorTemplateProps>> = ({
  label,
  children,
}) => {
  const pathname = usePathname();
  console.log("pathname: ", pathname);

  const renderBottomNavLinks = useCallback(() => {
    return CALCULATOR_LINKS.filter(
      (link) => link.href.indexOf(pathname) === -1
    ).map((link) => {
      return (
        <CalculatorLogo
          href={link.href}
          key={link.href}
          label={link.label}
          logoUrl={link.logoUrl}
        />
      );
    });
  }, [pathname]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* Top Div */}
      <div className={styles.calculatorTemplateTopDiv}>{label}</div>

      {/* Middle Div */}
      <div className={styles.calculatorTemplateMiddleDiv}>{children}</div>

      {/* Bottom Div */}
      <div className={styles.calculatorTemplateBottomDiv}>
        {renderBottomNavLinks()}
      </div>
    </div>
  );
};

export default CalculatorTemplate;
