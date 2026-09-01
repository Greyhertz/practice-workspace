import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, Plane, Bed, Ticket, Percent } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Pie,
  Legend,
  PieChart,
} from "recharts";

interface QuoteItem {
  id: number;
  service: string;
  type: "Transport" | "Accommodation" | "Activity";
  pricePerUnit: number;
  quantity: number;
  taxRate: number; // e.g. 0.05 for 5%
}

const Booking = () => {
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 1,
      service: "Flight to Tokyo",
      type: "Transport",
      pricePerUnit: 800,
      quantity: 2,
      taxRate: 0.12,
    },
    {
      id: 2,
      service: "Hotel Zen",
      type: "Accommodation",
      pricePerUnit: 200,
      quantity: 5,
      taxRate: 0.08,
    },
    {
      id: 3,
      service: "City Tour",
      type: "Activity",
      pricePerUnit: 50,
      quantity: 4,
      taxRate: 0.05,
    },
  ]);

  // --- YOUR LOGIC CHALLENGE ---

  // 1. Calculate Subtotal (Sum of all items: price * qty)
  const subTotal = items.reduce((acc, curr) => {
    return acc + curr.pricePerUnit * curr.quantity;
  }, 0);

  // 2. Calculate Total Tax (Sum of: price * qty * taxRate)
  const totalTax = items.reduce((acc, curr) => {
    return acc + (curr.pricePerUnit * curr.quantity) * curr.taxRate;
  }, 0); // TODO: Solve this with .reduce()

  // 3. Grand Total
  const grandTotal = subTotal + totalTax;

  // 4. Activity Spending (Sum of prices for ONLY 'Activity' types)
  const activitySpending = items
    .filter((item) => item.type === "Activity")
    .reduce((acc, curr) => acc + curr.pricePerUnit * curr.quantity, 0); // TODO: Solve this with .filter().reduce();

  const priceBeforeDiscount = subTotal + totalTax;

  // 4. THE SAVINGS (If > 2500, calculate 10% of the Combined Total)
  const appliedDiscountAmount =
    priceBeforeDiscount > 2500 ? priceBeforeDiscount * 0.1 : 0;

  // 5. THE FINAL GRAND TOTAL (What the user actually pays)
  const finalGrandTotal = priceBeforeDiscount - appliedDiscountAmount;

  const chartDataObj = items.reduce((acc: any, curr) => {
    const category = curr.type;
    const cost = curr.pricePerUnit * curr.quantity;

    // If category doesn't exist in our "bank", create it at 0
    if (!acc[category]) acc[category] = 0;

    // Add the current cost to that category
    acc[category] += cost;
    return acc;
  }, {});

  // Convert that object { Transport: 1600 } into the Array format Recharts wants
  const pieChartData = Object.entries(chartDataObj).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* SUMMARY RIBBON */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 text-white">
          <CardHeader className="py-2">
            <CardTitle className="text-xs">Subtotal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${subTotal.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-xs text-red-600">Total Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalTax.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-green-500 bg-green-50">
          <CardHeader className="py-2">
            <CardTitle className="text-xs text-green-700">
              Grand Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Change 'grandTotal' to 'finalGrandTotal' */}
            <p className="text-2xl font-bold text-green-800">
              ${finalGrandTotal.toLocaleString()}
            </p>

            {/* Add this block to actually show the discount on screen */}
            {appliedDiscountAmount > 0 && (
              <p className="text-[10px] font-bold text-green-600 animate-bounce">
                VIP Discount Applied: -${appliedDiscountAmount.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-xs text-blue-600">
              Fun Budget (Activities)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700">
              ${activitySpending}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ITEM LIST */}
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Receipt className="w-4 h-4" /> Line Items
          </h3>
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-2xl flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                {item.type === "Transport" && (
                  <Plane className="text-blue-500" />
                )}
                {item.type === "Accommodation" && (
                  <Bed className="text-orange-500" />
                )}
                {item.type === "Activity" && (
                  <Ticket className="text-green-500" />
                )}
                <div>
                  <p className="font-bold">{item.service}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} x ${item.pricePerUnit} (Tax:{" "}
                    {item.taxRate * 100}%)
                  </p>
                </div>
              </div>
              <p className="font-black">
                ${(item.pricePerUnit * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* PRO CHALLENGE: PIE CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData} // Use the array you created!
                  cx="50%"
                  cy="50%"
                  // innerRadius={60}
                  // outerRadius={80}
                  // paddingAngle={5}
                  dataKey="value"
                >
                  {/* You can map through your data to give each slice a different color */}
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#3b82f6"
                          : index === 1
                            ? "#f97316"
                            : "#22c55e"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
