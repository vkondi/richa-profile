"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PopupContextType = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
  reset: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const reset = () => {
    setTitle("");
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen: isOpen,
        setOpen,
        title,
        setTitle,
        content,
        setContent,
        reset,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupProvider");
  }
  return context;
};
