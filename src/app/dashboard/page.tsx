import ProtectedRoute from "@/components/core/ProtectedRoute";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Dashboard() {
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
            <div className="px-4 py-10">One</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-h-[100%]">
            <div className="px-4 py-10">Two</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ProtectedRoute>
  );
}
