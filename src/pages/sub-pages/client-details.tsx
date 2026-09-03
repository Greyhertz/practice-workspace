import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTasks } from "@/hooks/useTask"; // Fixed import name
import { useQueryClient } from "@tanstack/react-query"; // Access the cache
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Briefcase,
  ChevronLeft,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tasks } = useTasks();
  const [title, setTitle] = useState(""); // For search input
  const { addTask } = useTasks();

  // 1. DATA LOGIC:
  // First, check if we passed the client via state (Fastest)
  // If not, try to find the client in the TanStack Query cache ['clients']
  const location = useLocation();
  const cachedClients = queryClient.getQueryData<any[]>(["clients"]);
  const client =
    location.state?.client || cachedClients?.find((c) => c.id === Number(id));

  // 2. ANALYTICS LOGIC:
  // Filter tasks belonging to THIS client
  const clientTasks = tasks.filter((t) => t.clientId === Number(id));;
  const completedTasks = clientTasks.filter(
    (t) => t.status === "Completed",
  ).length;

  const handleQuickAdd = () => {
    addTask(title, "Medium", Number(id));
  };

  if (!client) {
    return (
      <div className="p-20 text-center">
        <p>Client not found.</p>{" "}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ChevronLeft className="mr-2 w-4 h-4" /> Back to CRM
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: CLIENT INFO CARD */}
        <Card className="lg:col-span-1 border-2 border-blue-100 shadow-sm">
          <CardHeader className="text-center border-b bg-muted/20">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {client.name.charAt(0)}
            </div>
            <CardTitle className="capitalize">{client.name}</CardTitle>
            <Badge variant={client.status === "Pro" ? "default" : "secondary"}>
              {client.status || "Lead"}
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span>{client.company?.name || "Independent"}</span>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: ANALYTICS & TASKS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-green-600 uppercase">
                    Active Tasks
                  </p>
                  <p className="text-2xl font-black text-green-800">
                    {clientTasks.length}
                  </p>
                </div>
                <CheckCircle2 className="text-green-400 w-8 h-8" />
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-[10px] font-bold text-blue-600 uppercase">
                  Completion Rate
                </p>
                <p className="text-2xl font-black text-blue-800">
                  {clientTasks.length > 0
                    ? Math.round((completedTasks / clientTasks.length) * 100)
                    : 0}
                  %
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assigned Project Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clientTasks.length > 0 ? (
                clientTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between p-3 border rounded-xl bg-card hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium">{task.title}</span>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground italic text-sm text-center py-10">
                  No tasks assigned to this client.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Task name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <Select onValueChange={setNewPriority} defaultValue="Medium">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select> */}
        <Button
          onClick={handleQuickAdd}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
