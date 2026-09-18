import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActivityStore } from "@/store/useActivityStore";
import { useAuthStore } from "@/store/useAuthStore";

export function ActivityFeeds() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logs = useActivityStore((state) =>
    currentUser ? (state.logsByUser[currentUser.email] ?? []) : [],
  );
  console.log("READING FOR:", currentUser?.email, "LOGS FOUND:", logs.length);

  const logText = (type: string, text: string) => {
    const typeLabel = (
      <span className="ml-4 shrink-0 text-muted-foreground">({type})</span>
    );

    switch (type) {
      case "task":
        return (
          <p className="flex w-full justify-between text-sm leading-6 text-blue-800">
            <span>{text}</span>
            {typeLabel}
          </p>
        );
      case "xp":
        return (
          <p className="flex w-full justify-between text-sm leading-6 text-green-600">
            <span>{text}</span>
            {typeLabel}
          </p>
        );
      default:
        return (
          <p className="flex w-full justify-between text-sm leading-6 text-red-500">
            <span>{text}</span>
            {typeLabel}
          </p>
        );
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Activity feed</h1>
          <p className="text-muted-foreground">
            Keep up with the latest changes and updates in your workspace.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              A timeline of what has happened recently.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {logs.length ? (
              <div className="divide-y">
                {logs.map((log, id) => (
                  <div key={log.id} className="flex gap-4 p-5">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-6 text-foreground">
                        {/* {typeof log === "string" ? log : JSON.stringify(log)} */}
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                      {logText(log.type || "client", log.text)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="font-medium">No activity yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  New workspace activity will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
