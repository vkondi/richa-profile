"use client";

import React, { FC, useState, useCallback, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { getLifePathNumber } from "@utils/utility";
import DateCalcTemplate from "@/components/layouts/DateCalcTemplate";
import { useRootContext } from "@/context/RootContext";

const DestinyNumberCalculator: FC = () => {
  const { dob, setDOB } = useRootContext();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const handleCalculate = useCallback(() => {
    if (dob) {
      setResultVisibility(true);
    }
  }, [dob]);

  const handleDOBChange = useCallback(
    (value: string) => {
      setDOB(value);
      setResultVisibility(false);
    },
    [setDOB]
  );

  const destinyNymber = useMemo(() => {
    if (dob) {
      return getLifePathNumber(dob);
    }
    return undefined;
  }, [dob]);

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile title="Destiny number" result={destinyNymber} />
      </>
    );
  };

  return (
    <DateCalcTemplate
      title="Destiny Numerology Calculator"
      onCalculateClick={handleCalculate}
      dob={dob}
      onDOBChange={handleDOBChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default DestinyNumberCalculator;
