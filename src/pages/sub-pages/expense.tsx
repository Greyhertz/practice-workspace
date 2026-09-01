import React, { useState } from "react";
import {
  Wallet,
  Plus,
  Trash2,
  PieChart,
  ShoppingBag,
  Home,
  Car,
  Utensils,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
// import { SelectContent, SelectItem } from "@radix-ui/react-select";

// 1. Types for our data
interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  category: "Food" | "Rent" | "Transport" | "Other";
}

export default function ExpenseTracker() {
  const addPoint = useUserStore((state) => state.addPoint);
  
  // 2. STATE: Our list of expenses
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 1, title: "Starbucks", amount: 15, category: "Food" },
    { id: 2, title: "Monthly Rent", amount: 1200, category: "Rent" },
  ]);

  // 3. FORM STATE: Local state for the inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseItem["category"]>("Food");

  // --- THE LOGIC SECTION (Analytics) ---

  // A. Calculate TOTAL (The Reduce Method)
  // 'acc' is the accumulator (running total), 'curr' is the current item
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // B. Calculate FOOD TOTAL (Filter + Reduce)
  const foodTotal = expenses 
    .filter((item) => item.category === "Food")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // C. Find the MOST EXPENSIVE item
  const maxExpense =
    expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;

  // --- ACTIONS ---

  const handleAddExpense = () => {
    if (!title || !amount) return;

    const newItem: ExpenseItem = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([newItem, ...expenses]);
    addPoint(5); // Reward global XP
    setTitle("");
    setAmount("");
  };


  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* KPI CARDS: ANALYTICS PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase opacity-80">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">
              ${totalSpent.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase text-orange-600">
              Food Only
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-700">${foodTotal}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase text-green-600">
              Highest Bill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">${maxExpense}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ADD EXPENSE FORM */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> New Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              placeholder="Expense title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-muted/50 rounded-xl outline-none border focus:border-primary transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-3 bg-muted/50 rounded-xl outline-none border focus:border-primary transition-all"
              />
              <Select
                value={category}
                // onChange={(e) => setCategory(e.target.value as any)}
                // className="p-3 bg-muted/50 rounded-xl outline-none border focus:border-primary transition-all"
              >
                <SelectTrigger />
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddExpense}
              className="w-full py-6 font-bold text-lg"
            >
              Save Expense
            </Button>
          </CardContent>
        </Card>

        {/* LIST SECTION */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" /> History
          </h3>
          <div className="grid gap-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="p-4 bg-card border rounded-2xl flex items-center justify-between group transition-all hover:border-primary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {expense.category === "Food" && (
                      <Utensils className="w-4 h-4" />
                    )}
                    {expense.category === "Rent" && (
                      <Home className="w-4 h-4" />
                    )}
                    {expense.category === "Transport" && (
                      <Car className="w-4 h-4" />
                    )}
                    {expense.category === "Other" && (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{expense.title}</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">
                      {expense.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-black text-sm text-red-500">
                    -${expense.amount}
                  </p>
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
