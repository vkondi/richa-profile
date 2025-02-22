"use client";

import React, { FC, useState, useCallback, ChangeEvent, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { getExpressionNumber } from "@utils/utility";
import NameCalculatorTemplate from "@/components/NameCalculatorTemplate";
import { SystemType } from "../name-numerology-calculator/page";

const DestinyNumberCalculator: FC = () => {
  const [system, setSystem] = useState<SystemType>("pythagorean");
  const [name, setName] = useState<string | undefined>();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const handleCalculate = useCallback(() => {
    if (name) {
      setResultVisibility(true);
    }
  }, [name]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setResultVisibility(false);
  }, []);

  const handleSystemChange = useCallback((value: SystemType) => {
    setSystem(value);
    setResultVisibility(false);
  }, []);

  const expressionNumber = useMemo(() => {
    if (name) {
      return getExpressionNumber(name, system);
    }
    return undefined;
  }, [name, system]);

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile title="Destiny number" result={expressionNumber} />
      </>
    );
  };

  return (
    <NameCalculatorTemplate
      title="Destiny Numerology Calculator"
      onCalculateClick={handleCalculate}
      name={name}
      onNameChange={handleNameChange}
      system={system}
      onSystemChange={handleSystemChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default DestinyNumberCalculator;
