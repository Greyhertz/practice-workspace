import { useTasks } from "@/hooks/useTask";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/useUserStore";
import { BarChart3, Search, Trash2, Trophy } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguageStore } from "@/store/useLanguageStore";

const TaskManager = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<any>("Medium");
  const currentUser = useAuthStore((state) => state.currentUser);
  const { t, currentLang } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const points = useUserStore((state) => {
    // 1. Get the current user's email
    currentUser ? (state.pointsByUser[currentUser.email] ?? 0) : 0;
    const userEmail = currentUser?.email;

    if (!userEmail) return 0; // Default to 0 XP if no one is logged in

    // 2. Look up this user's specific points from the new map structure
    // (Falling back to 0 XP if this user doesn't have a record yet)
    return state.pointsByUser?.[userEmail] || 0;
  });
  const {
    search,
    setSearch,
    filteredTasks,
    addTask,
    removeTask,
    clickToComplete,
    clearAll,
    completionRate,
    efficiencyScore,
    tasks,
  } = useTasks();

  // Create chart data inside the component based on current tasks
  const priorityData = tasks.reduce((acc: any, curr) => {
    acc[curr.priority] = (acc[curr.priority] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(priorityData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select
          value={currentLang}
          onValueChange={(lang) =>
            setLanguage(lang as Parameters<typeof setLanguage>[0])
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI TOP BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600 text-white">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-black">{completionRate}%</p>
            <p className="text-[10px] uppercase font-bold">{t("progress")}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-600 text-white">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-black">{points}</p>
            <p className="text-[10px] uppercase font-bold">{t("totalXp")}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 text-white">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-black">{efficiencyScore}</p>
            <p className="text-[10px] uppercase font-bold">{t("efficiency")}</p>
          </CardContent>
        </Card>
        <Button
          variant="destructive"
          onClick={clearAll}
          className="h-full rounded-2xl"
        >
          <Trash2 className="mr-2 h-4 w-4" /> {t("clearAll")}
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* SEARCH & ADD BAR */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchTask")}
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t("taskName")}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Select onValueChange={setNewPriority} defaultValue="Medium">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">{t("high")}</SelectItem>
                  <SelectItem value="Medium">{t("medium")}</SelectItem>
                  <SelectItem value="Low">{t("low")}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  addTask(newTitle, newPriority);
                  setNewTitle("");
                }}
              >
                {t("add")}
              </Button>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-xl bg-muted/30 group"
              >
                <div>
                  <p className="font-bold text-sm">{task.title}</p>
                  <p
                    className={`text-[10px] font-bold ${task.priority === "High" ? "text-red-500" : "text-blue-500"}`}
                  >
                    {t(task.priority.toLowerCase())} {t("priority")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => clickToComplete(task.id)}
                  >
                    {task.status}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => removeTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CHART REMAINING... */}
      <Card className="lg:col-span-1 bg-background">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> {t("priorityDistribution")}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={
                      entry.name === "High"
                        ? "#ef4444"
                        : entry.name === "Medium"
                          ? "#f59e0b"
                          : "#3b82f6"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManager;
