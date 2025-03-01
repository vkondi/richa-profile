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
