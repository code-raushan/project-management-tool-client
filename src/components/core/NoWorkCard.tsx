import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function NoWorkCreated() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Card className="p-6 max-w-sm w-full text-center shadow-md rounded-md">
        <CardHeader>
          <CardTitle>No Work Created</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            It looks like you haven't created any work items yet. Start adding
            new work items to see them here.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
