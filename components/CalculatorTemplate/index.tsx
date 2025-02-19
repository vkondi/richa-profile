"use client";
// CalculatorTemplate.jsx

import React, { FC, PropsWithChildren, useCallback } from "react";
import { usePathname } from "next/navigation";

import CalculatorLogo from "./CalculatorLogo";

import { CALCULATOR_LINKS } from "@utils/constants";

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
      <div
        style={{
          width: "100%",
          height: "200px",
          background: "linear-gradient(to right, #5e5eed, #1cd8d9, #00a900)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        {label}
      </div>

      {/* Middle Div */}
      <div
        style={{
          flex: 1, // Allows the middle div to take up remaining height
          overflow: "auto", //  if the content exceeds the available space
        }}
      >
        {children}
      </div>

      {/* Bottom Div */}
      <div
        style={{
          width: "100%",
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 50,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#f0f0f0", // Optional:  background color for better visibility
        }}
      >
        {renderBottomNavLinks()}
      </div>
    </div>
  );
};

export default CalculatorTemplate;
