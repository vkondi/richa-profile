"use client";

import React, { FC, useState, useCallback } from "react";
import { calculatePinnacleNumber } from "@utils/utility";
import DateCalcTemplate from "@/components/templates/DateCalcTemplate";
import { useRootContext } from "@/context/RootContext";
import PinnacleResultGrid from "./PinnacleResultGrid";
import { PinnacleDataType } from "@/types/types";

const PinnacleNumberCalculator: FC = () => {
  const { dob, setDOB, getInterpretation } = useRootContext();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const [pinnacleData, setPinnacleData] = useState<PinnacleDataType[]>([]);

  const handleCalculate = useCallback(() => {
    if (dob) {
      const data = calculatePinnacleNumber(dob)?.map((rec) => {
        return {
          ...rec,
          description: getInterpretation("PINNACLE", rec.number)?.description,
        };
      });

      setPinnacleData(data);

      setResultVisibility(true);
    }
  }, [dob, getInterpretation]);

  const handleDOBChange = useCallback(
    (value: string) => {
      setDOB(value);
      setResultVisibility(false);
    },
    [setDOB]
  );

  const renderResultTiles = () => {
    return <PinnacleResultGrid data={pinnacleData} />;
  };

  return (
    <DateCalcTemplate
      title="Pinnacle Number Calculator"
      onCalculateClick={handleCalculate}
      dob={dob}
      onDOBChange={handleDOBChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default PinnacleNumberCalculator;
