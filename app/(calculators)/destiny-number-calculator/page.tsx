"use client";

import React, { FC, useState, useCallback, useMemo } from "react";
import ResultTile from "@/components/ResultTile";
import { getDestinyNumber } from "@utils/utility";
import DateCalcTemplate from "@/components/templates/DateCalcTemplate";
import { useRootContext } from "@/context/RootContext";
import { DESTINY_NUM_INTERPRETATION } from "@/utils/constants";

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
    [setDOB],
  );

  const destinyNymber = useMemo(() => {
    if (dob) {
      return getDestinyNumber(dob);
    }
    return undefined;
  }, [dob]);

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile
          title="Destiny number"
          result={destinyNymber}
          type={DESTINY_NUM_INTERPRETATION}
        />
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
