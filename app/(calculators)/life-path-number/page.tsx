"use client";

import DateCalcTemplate from "@/components/layouts/DateCalcTemplate";
import ResultTile from "@/components/ResultTile";
import { useRootContext } from "@/context/RootContext";
import { SystemType } from "@/types/types";
import { getLifePathNumber } from "@/utils/utility";
import { useCallback, useMemo, useState } from "react";

const LifePathNumber = () => {
  const { dob, setDOB, system, setSystem } = useRootContext();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const lifePathNumber = useMemo(() => {
    if (dob) {
      return getLifePathNumber(dob);
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

  const handleSystemChange = useCallback(
    (value: SystemType) => {
      setSystem(value);
      setResultVisibility(false);
    },
    [setSystem]
  );

  const renderResultTiles = () => {
    return (
      <>
        <ResultTile title="Life path number" result={lifePathNumber} />
      </>
    );
  };

  return (
    <DateCalcTemplate
      title="Life Path Number Calculator"
      onCalculateClick={handleCalculate}
      dob={dob}
      onDOBChange={handleDOBChange}
      system={system}
      onSystemChange={handleSystemChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default LifePathNumber;
