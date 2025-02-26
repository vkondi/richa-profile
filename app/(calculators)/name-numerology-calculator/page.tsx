"use client";

import React, { useState, useCallback, ChangeEvent, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { convertNameToNumber, getSoulUrgeNumber } from "@utils/utility";
import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "@/utils/constants";
import NameCalculatorTemplate from "@/components/NameCalculatorTemplate";
import { useRootContext } from "@/context/RootContext";
import { SystemType } from "@/types/types";

const NameNumerologyCalculator: React.FC = () => {
  const { name, setName, system, setSystem } = useRootContext();
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

  const nameToNumber = useMemo(() => {
    if (name) {
      return convertNameToNumber(
        name,
        system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING
      );
    }
    return undefined;
  }, [name, system]);

  const soulNumber = useMemo(() => {
    if (name) {
      return getSoulUrgeNumber(name, system);
    }
    return undefined;
  }, [name, system]);

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile title="Name to number" result={nameToNumber} />
        <ResultTile title="Soul number" result={soulNumber} />
      </>
    );
  };

  return (
    <NameCalculatorTemplate
      title="Name Numerology Calculator"
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

export default NameNumerologyCalculator;
