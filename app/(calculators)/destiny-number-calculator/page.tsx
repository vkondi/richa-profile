"use client";

import React, { FC, useState, useCallback, ChangeEvent, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { getExpressionNumber } from "@utils/utility";
import NameCalcTemplate from "@/components/layouts/NameCalcTemplate";
import { useRootContext } from "@/context/RootContext";
import { SystemType } from "@/types/types";

const DestinyNumberCalculator: FC = () => {
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
    <NameCalcTemplate
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
