"use client";

import {
  InterpretationModel,
  LoshuGridInterpretation,
  SystemType,
} from "@/types/types";
import { INTERPRETATIONS_URL, LOSHU_INTERPRETATIONS_URL } from "@/utils/URL";
import { exists } from "fs";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type RootContextType = {
  name?: string;
  dob?: string;
  system?: SystemType;
  setName: Dispatch<SetStateAction<string | undefined>>;
  setDOB: Dispatch<SetStateAction<string | undefined>>;
  setSystem: Dispatch<SetStateAction<SystemType | undefined>>;
  interpretations?: InterpretationModel[];
  getInterpretation: (
    type: InterpretationModel["type"],
    number: InterpretationModel["number"],
  ) => InterpretationModel | null;
  fetchLoshuInterpretations: (forceFetch?: boolean) => void;
  loshuInterpretations?: LoshuGridInterpretation;
};

const RootContext = createContext<RootContextType | undefined>(undefined);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [system, setSystem] = useState<SystemType | undefined>("pythagorean");
  const [name, setName] = useState<string | undefined>();
  const [dob, setDOB] = useState<string | undefined>();
  const [interpretations, setInterpretations] = useState<
    InterpretationModel[] | undefined
  >();

  const [loshuInterpretations, setLoshuInterpretations] = useState<
    LoshuGridInterpretation | undefined
  >();

  // API call to fetch Interpretations
  const fetchInterpretations = async () => {
    try {
      const response = await fetch(INTERPRETATIONS_URL);
      const parsedResponse = await response.json();

      // Error check
      if (!response.ok) {
        throw new Error(
          parsedResponse.error || "Failed fetching interpretations",
        );
      }

      setInterpretations(parsedResponse?.data ?? []);
    } catch (err: unknown) {
      console.error("[fetchInterpretations] >> Exception: ", err);
    }
  };

  // API call to fetch Lo-shu Interpretations
  const fetchLoshuInterpretations = async (forceFetch: boolean = false) => {
    try {
      // Check if data already exists
      if (!forceFetch && loshuInterpretations) return;

      const response = await fetch(LOSHU_INTERPRETATIONS_URL);
      const parsedResponse = await response.json();

      // Error check
      if (!response.ok) {
        throw new Error(
          parsedResponse.error || "Failed fetching loshu interpretations",
        );
      }

      setLoshuInterpretations(parsedResponse?.data);
    } catch (err: unknown) {
      console.error("[fetchLoshuInterpretations] >> Exception: ", err);
    }
  };

  const getInterpretation = useCallback(
    (
      type: InterpretationModel["type"],
      number: InterpretationModel["number"],
    ): InterpretationModel | null => {
      // Implement the logic to find and return the appropriate interpretation
      const interpretation = interpretations?.find(
        (interpretation) =>
          interpretation.type === type && interpretation.number === number,
      );
      if (!interpretation) {
        console.error(
          `Interpretation not found for type: ${type} and number: ${number}`,
        );
        return null;
      }
      return interpretation;
    },
    [interpretations],
  );

  useEffect(() => {
    fetchInterpretations();
  }, []);

  return (
    <RootContext.Provider
      value={{
        name,
        dob,
        system,
        setName,
        setDOB,
        setSystem,
        interpretations,
        getInterpretation,
        fetchLoshuInterpretations,
        loshuInterpretations,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context)
    throw new Error("useRootContext must be used within a RootProvider");

  return context;
};
