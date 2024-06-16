"use client";
import { Context } from "@/lib/context";
import { ReactNode, useState } from "react";
import { IWorks } from "./WorksList";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWork, setSelectedWork] = useState<IWorks | {}>({});

  return (
    <Context.Provider value={{ selectedWork, setSelectedWork }}>
      {children}
    </Context.Provider>
  );
};
