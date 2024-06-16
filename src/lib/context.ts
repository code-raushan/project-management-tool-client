"use client";

import { IWorks } from "@/components/core/WorksList";
import { createContext, Dispatch, SetStateAction } from "react";

type ContextValue = {
  selectedWork: IWorks | null;
  setSelectedWork: Dispatch<SetStateAction<IWorks | null>>;
};

let defaultValues = {
  selectedWork: null,
  setSelectedWork: () => null,
};

export const Context = createContext<ContextValue>(defaultValues);
