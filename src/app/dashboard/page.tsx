import ProtectedRoute from "@/components/core/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>protected route</h1>
    </ProtectedRoute>
  );
}
