import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export interface TaskItem {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "In Progress" | "Completed";
}

export const useTasks = () => {
  const addPoint = useUserStore((state) => state.addPoint);

  // 1. LAZY INITIALIZATION: Reads from disk ONLY once on boot
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem("expedition-tasks");
    if (saved) return JSON.parse(saved);
    // Default data if storage is empty
    return [
      { id: 1, title: "Secure Base Camp", priority: "High", status: "Completed" },
      { id: 2, title: "Gather Food Supplies", priority: "High", status: "Backlog" },
    ];
  });

  const [search, setSearch] = useState("");

  // 2. PERSISTENCE: Save to disk whenever tasks change
  useEffect(() => {
    localStorage.setItem("expedition-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: TaskItem["priority"]) => {
    if(title.trim() === "") return alert("Add a title! Title cannot be empty!"); // Prevent adding empty tasks
    const newTask: TaskItem = { id: Date.now(), title, priority, status: "Backlog" };
    setTasks([newTask, ...tasks]);
  };

  const removeTask = (taskId: number) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const clickToComplete = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus: Record<TaskItem["status"], TaskItem["status"]> = {
          Backlog: "In Progress",
          "In Progress": "Completed",
          Completed: "Completed",
        };
        const nextState = nextStatus[task.status];
        if (task.status !== "Completed" && nextState === "Completed") addPoint(20);
        return { ...task, status: nextState };
      }),
    );
  };

  const clearAll = () => {
    if (window.confirm("Are you sure?")) setTasks([]);
  };

  // 3. ANALYTICS
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  const completionRate = tasks.length ? Math.round((tasks.filter(t => t.status === "Completed").length / tasks.length) * 100) : 0;
  const efficiencyScore = tasks.reduce((acc, curr) => {
    if (curr.status === "Completed") return acc + 10;
    if (curr.status === "In Progress") return acc + 5;
    return acc;
  }, 0);

  return { tasks, search, setSearch, filteredTasks, addTask, removeTask, clickToComplete, clearAll, completionRate, efficiencyScore };
};