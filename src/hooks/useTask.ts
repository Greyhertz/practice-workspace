import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useActivityStore } from "@/store/useActivityStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStorageKey } from "./use-storage-key";

export interface TaskItem {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "In_Progress" | "Completed";
  clientId: number;
}

export const useTasks = () => {
  const addPoint = useUserStore((state) => state.addPoint);
  const addLog = useActivityStore((state) => state.addLog);
  const currentUser = useAuthStore((state) => state.currentUser);
  const storageKey = useTaskStorageKey();

  // 1. LAZY INITIALIZATION: Reads from disk ONLY once on boot
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    // Default data if storage is empty
    return [];
  });
  const [search, setSearch] = useState("");

  // 2. PERSISTENCE: Save to disk whenever tasks change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
    }
  }, [storageKey]);

  const addTask = (
    title: string,
    priority: TaskItem["priority"],
    clientId: number,
  ) => {
    if (title.trim() === "")
      return alert("Add a title! Title cannot be empty!"); // Prevent adding empty tasks
    const newTask: TaskItem = {
      id: Date.now(),
      title,
      priority,
      status: "Backlog",
      clientId,
    };
    setTasks([newTask, ...tasks]);
    if (clientId) {
      addPoint(15);
    } else {
      addPoint(5);
    }
    console.log("LOGGING FOR:", useAuthStore.getState().currentUser?.email);
    addLog({ text: `Task "${title}" was created`, type: "task" });
  };

  const removeTask = (taskId: number) => {
    const taskTitle = tasks.find((t) => t.id === taskId)?.title;
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev?.filter((t) => t.id !== taskId));
      addLog({ text: `Task ${taskTitle} has been removed`, type: "task" });
      console.log(taskTitle);
      console.log(addLog);
    }
  };

  const clickToComplete = (taskId: number) => {
    const taskStatus = tasks.find((t) => t.id === taskId)?.title;
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus: Record<TaskItem["status"], TaskItem["status"]> = {
          Backlog: "In_Progress",
          In_Progress: "Completed",
          Completed: "Completed",
        };
        const nextState = nextStatus[task.status];
        if (task.status !== "Completed" && nextState === "Completed") {
          addLog({
            text: `Task "${taskStatus}" was completed`,
            type: "task",
          });
          addPoint(20);
        }
        return { ...task, status: nextState };
      }),
    );
    console.log(addLog);
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
      addLog({ text: `Cleared al tasks`, type: "task" });
    }
  };

  // 3. ANALYTICS
  const filteredTasks = tasks?.filter((t) =>
    t.title?.toLowerCase().includes(search?.toLowerCase()),
  );
  const completionRate = tasks.length
    ? Math.round(
        (tasks?.filter((t) => t.status === "Completed").length / tasks.length) *
          100,
      )
    : 0;
  const efficiencyScore = tasks.reduce((acc, curr) => {
    if (curr.status === "Completed") return acc + 10;
    if (curr.status === "In_Progress") return acc + 5;
    return acc;
  }, 0);

  return {
    tasks,
    search,
    setSearch,
    filteredTasks,
    addTask,
    removeTask,
    clickToComplete,
    clearAll,
    completionRate,
    efficiencyScore,
  };
};
