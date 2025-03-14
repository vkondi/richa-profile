"use client";

import React, { useState, useCallback, ChangeEvent, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { convertNameToNumber, getSoulUrgeNumber } from "@utils/utility";
import {
  CHALDEAN_MAPPING,
  NAME_TO_NUM_INTERPRETATION,
  PYTHAGOREAN_MAPPING,
  SOUL_NUM_INTERPRETATION,
} from "@/utils/constants";
import NameCalcTemplate from "@/components/templates/NameCalcTemplate";
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

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setResultVisibility(false);
    },
    [setName]
  );

  const handleSystemChange = useCallback(
    (value: SystemType) => {
      setSystem(value);
      setResultVisibility(false);
    },
    [setSystem]
  );

  const nameToNumber = useMemo(() => {
    if (name) {
      return convertNameToNumber(
        name,
        system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING
      );
    }
    return undefined;
  }, [name, system]);

  const soulUrgeNumber = useMemo(() => {
    if (name) {
      return getSoulUrgeNumber(name, system);
    }
    return undefined;
  }, [name, system]);

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile
          title="Name to number"
          result={nameToNumber}
          type={NAME_TO_NUM_INTERPRETATION}
        />
        <ResultTile
          title="Soul urge number"
          result={soulUrgeNumber}
          type={SOUL_NUM_INTERPRETATION}
        />
      </>
    );
  };

  return (
    <NameCalcTemplate
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
