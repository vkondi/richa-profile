"use client";

import React, {
  useState,
  useCallback,
  ChangeEvent,
  useMemo,
  useEffect,
  FC,
} from "react";
import ResultTile from "@/components/ResultTile";
import {
  convertNameToNumber,
  getBirthDayNumber,
  getDestinyNumber,
  getSoulUrgeNumber,
} from "@utils/utility";
import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "@/utils/constants";
import NameDateCalcTemplate from "@/components/templates/NameDateCalcTemplate";
import { useRootContext } from "@/context/RootContext";
import { SystemType } from "@/types/types";
import { usePopupContext } from "@/context/PopupContext";

const NameNumerologyCalculator: FC = () => {
  const { name, setName, dob, setDOB, system, setSystem } = useRootContext();
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);

  const { setOpen } = usePopupContext();

  const handleCalculate = useCallback(() => {
    if ((name && system) || dob) {
      setResultVisibility(true);
    }
  }, [name, dob, system]);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleDOBChange = useCallback(
    (value: string) => {
      setDOB(value);
    },
    [setDOB]
  );

  const handleSystemChange = useCallback(
    (value: SystemType) => {
      setSystem(value);
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

  const destinyNymber = useMemo(() => {
    if (dob) {
      return getDestinyNumber(dob);
    }
    return undefined;
  }, [dob]);

  const personalityNumber = useMemo(() => {
    if (dob) {
      return getBirthDayNumber(new Date(dob).getDate());
    }

    return undefined;
  }, [dob]);

  const renderResultTiles = () => {
    return (
      <>
        {typeof nameToNumber === "number" && (
          <ResultTile title="Name to number" result={nameToNumber} />
        )}
        {typeof soulUrgeNumber === "number" && (
          <ResultTile title="Soul urge number" result={soulUrgeNumber} />
        )}
        {typeof destinyNymber === "number" && (
          <ResultTile title="Destiny number" result={destinyNymber} />
        )}
        {typeof personalityNumber === "number" && (
          <ResultTile title="Personality number" result={personalityNumber} />
        )}
      </>
    );
  };

  useEffect(() => {
    setResultVisibility(false);
  }, [name, dob, system]);

  useEffect(() => {
    setOpen(true);
  },[setOpen])

  return (
    <NameDateCalcTemplate
      title="All in One Calculator"
      onCalculateClick={handleCalculate}
      name={name}
      onNameChange={handleNameChange}
      dob={dob}
      onDOBChange={handleDOBChange}
      systemVisibility
      system={system}
      onSystemChange={handleSystemChange}
      ResultTiles={renderResultTiles()}
      resultVisibility={resultVisibility}
    />
  );
};

export default NameNumerologyCalculator;
