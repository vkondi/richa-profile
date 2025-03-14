import { ChangeEvent, MouseEventHandler, ReactElement } from "react";

export type SystemType = "chaldean" | "pythagorean";

export type TemplateProps = {
  title: string;
  onCalculateClick: MouseEventHandler<HTMLDivElement>;
  systemVisibility?: boolean;
  system?: SystemType | undefined;
  onSystemChange?: (arg0: SystemType) => void;
  ResultTiles: ReactElement<unknown, string>;
  resultVisibility: boolean;
};

export type DateCalcTemplateProps = {
  dob: string | undefined;
  onDOBChange: (date: string) => void;
  dobLabel?: string;
};

export type NameCalcTemplateProps = {
  name: string | undefined;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type SysUserModel = {
  id: number;
  email: string;
  name: string;
  password?: string;
};

export type InterpretationModel = {
  id: number;
  type: string;
  number: number;
  description: string;
};

export type INTERPRETATION =
  | "NAME_TO_NUMBER"
  | "SOUL"
  | "DESTINY"
  | "PERSONALITY"
  | "CHALLENGE"
  | "PINNACLE";

export type PinnacleDataType = {
  id: number;
  pinnacle: string;
  ageStart: number;
  ageEnd?: number;
  ageSpan: string;
  number: number;
  description?: string;
};
