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
  const logText = (type: string, text: string) => {
    const typeLabel = (
      <span className="ml-3 inline-flex shrink-0 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-current/70 ring-1 ring-inset ring-current/10">
        {type}
      </span>
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
    <main className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Workspace activity
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Activity feed
              </h1>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Keep up with the latest changes and updates in your workspace.
              </p>
            </div>
            {logs.length > 0 && (
              <div className="w-fit rounded-lg border bg-background px-3 py-2 text-sm shadow-sm">
                <span className="font-semibold">{logs.length}</span>{" "}
                <span className="text-muted-foreground">
                  {logs.length === 1 ? "update" : "updates"}
                </span>
              </div>
            )}
          </div>
        </div>

        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="border-b bg-background/80 px-6 py-5">
            <CardTitle className="text-lg">Recent activity</CardTitle>
            <CardDescription>
              A timeline of what has happened recently.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {logs.length ? (
              <div className="divide-y divide-border/70">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="group flex gap-4 p-5 transition-colors hover:bg-muted/40 sm:p-6"
                  >
                    <div className="relative flex w-3 shrink-0 justify-center">
                      <div className="z-10 mt-1 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] transition-transform group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                      <div className="mt-1.5">
                        {logText(log.type || "client", log.text)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
                  ✦
                </div>
                <p className="font-semibold">No activity yet</p>
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
