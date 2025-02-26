"use client";

import { SystemType } from "@/types/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type RootContextType = {
  name?: string;
  dob?: string;
  system?: SystemType;
  setName: Dispatch<SetStateAction<string | undefined>>;
  setDOB: Dispatch<SetStateAction<string | undefined>>;
  setSystem: Dispatch<SetStateAction<SystemType | undefined>>;
};

const RootContext = createContext<RootContextType | undefined>(undefined);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [system, setSystem] = useState<SystemType | undefined>("pythagorean");
  const [name, setName] = useState<string | undefined>();
  const [dob, setDOB] = useState<string | undefined>();

  return (
    <RootContext.Provider
      value={{ name, dob, system, setName, setDOB, setSystem }}
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
