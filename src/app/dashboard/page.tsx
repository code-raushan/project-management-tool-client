"use client";

import ProtectedRoute from "@/components/core/ProtectedRoute";
import WorksForm from "@/components/core/WorksForm";
import WorksList from "@/components/core/WorksList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Dashboard() {
  const [selected, setSelected] = useState("works");
  return (
    <ProtectedRoute>
      <main className="min-h-[90vh] min-w-[100vw]">
        <ResizablePanelGroup direction="horizontal" style={{ height: "90vh" }}>
          <ResizablePanel
            minSize={15}
            defaultSize={15}
            maxSize={35}
            className="border-r border-gray-500"
          >
            <div className="px-4 py-10 flex flex-col justify-center space-y-10">
              <div
                className="px-3 py-3 bg-white hover:bg-slate-100 animate-in shadow-lg rounded-lg min-w-[90%] flex justify-center cursor-pointer"
                onClick={() => setSelected("works")}
              >
                <h1 className="text-xl text-gray-800 font-semibold">
                  Works List
                </h1>
              </div>
              <div
                className="px-3 py-3 bg-white hover:bg-slate-100 animate-in shadow-lg rounded-lg min-w-[90%] flex justify-center cursor-pointer"
                onClick={() => setSelected("others")}
              >
                <h1 className="text-xl text-gray-800 font-semibold">
                  Others List
                </h1>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-h-[100%]">
            {selected === "works" && (
              <div className="px-4 py-10">
                <WorksForm />
                <Separator className="mt-10" />
                <WorksList />
              </div>
            )}
            {selected === "others" && (
              <div className="px-4 py-10">
                <h1>other one is selected</h1>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ProtectedRoute>
  );
}
