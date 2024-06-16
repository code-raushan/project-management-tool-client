"use client";

import { IWorks } from "@/components/core/WorksList";
import { createContext, Dispatch, SetStateAction } from "react";

type ContextValue = {
  selectedWork: IWorks | {};
  setSelectedWork: Dispatch<SetStateAction<IWorks>>;
};

let defaultValues = {
  selectedWork: {},
  setSelectedWork: () => {},
};

export const Context = createContext<ContextValue>(defaultValues);
