import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Wallet,
  Scale,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ItemProps {
  id: number;
  name: string;
  weight: number;
  price: number;
  currency: "Dollars" | "Pounds" | "Naira" | "Euros";
}

const EXCHANGE_RATES = {
  Dollars: 1,
  Euros: 0.92,
  Pounds: 0.78,
  Naira: 1500,
};

const Analytics = () => {
  const [items, setItems] = useState<ItemProps[]>([
    { id: 1, name: "Laptop", weight: 2.5, price: 1200, currency: "Dollars" },
    { id: 2, name: "Clothes", weight: 5.0, price: 150, currency: "Euros" },
    { id: 3, name: "Camera", weight: 1.2, price: 800, currency: "Pounds" },
  ]);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState<ItemProps["currency"]>("Dollars");

  // --- ANALYTICS LOGIC ---
  const totalWeight = items.reduce((total, curr) => total + curr.weight, 0);

  // Convert everything to US to get a real Total
  const totalValueUSD = items.reduce((total, curr) => {
    return total + curr.price / EXCHANGE_RATES[curr.currency];
  }, 0);

  const isOverweight = totalWeight > 8;

  const handleAddItems = () => {
    if (!name || !weight || !price) return alert("Please fill all fields");

    const newItem: ItemProps = {
      id: Date.now(),
      name,
      weight: parseFloat(weight),
      price: parseFloat(price),
      currency,
    };

    setItems([newItem, ...items]);
    // RESET FORM
    setName("");
    setWeight("");
    setPrice("");
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`${isOverweight ? "bg-destructive text-destructive-foreground" : "bg-card"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase flex items-center gap-2">
              <Scale className="w-4 h-4" /> Accumulated weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{totalWeight.toFixed(1)} kg</p>
            {isOverweight && (
              <p className="text-[10px] font-bold mt-1">⚠️ OVERWEIGHT LIMIT</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase">
              Total Value (Est. USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">
              $
              {totalValueUSD.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase">Item Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{items.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. FORM & LIST */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Add Item to Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 border rounded-xl"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="p-3 border rounded-xl"
                >
                  <option value="Dollars">USD ($)</option>
                  <option value="Euros">EUR (€)</option>
                  <option value="Pounds">GBP (£)</option>
                  <option value="Naira">NGN (₦)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-3 border rounded-xl"
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="p-3 border rounded-xl"
                />
              </div>
              <Button onClick={handleAddItems} className="w-full">
                Save to Bag
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-card border rounded-2xl group"
              >
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.weight}kg • {item.currency}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-black text-sm">
                    {item.price}{" "}
                    {item.currency === "Naira"
                      ? "₦"
                      : item.currency === "Euros"
                        ? "€"
                        : "$"}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. THE CHART (Visualizing the Weight) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Weight Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={items}>
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
                  {items.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.weight > 4 ? "#ef4444" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
