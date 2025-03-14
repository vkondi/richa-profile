"use client";

import DateCalcTemplate from "@/components/templates/DateCalcTemplate";
import ResultTile from "@/components/ResultTile";
import { useRootContext } from "@/context/RootContext";
import { getBirthDayNumber } from "@/utils/utility";
import { useCallback, useMemo, useState } from "react";
import { PERSONALITY_NUM_INTERPRETATION } from "@/utils/constants";

const LifePathNumber = () => {
  const { dob, setDOB } = useRootContext();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const personalityNumber = useMemo(() => {
    if (dob) {
      return getBirthDayNumber(new Date(dob).getDate());
    }

    return undefined;
  }, [dob]);

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

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile
          title="Personality number"
          result={personalityNumber}
          type={PERSONALITY_NUM_INTERPRETATION}
        />
      </>
    );
  };

  return (
    <DateCalcTemplate
      title="Personality Number Calculator"
      onCalculateClick={handleCalculate}
      dob={dob}
      onDOBChange={handleDOBChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default LifePathNumber;
