import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function Expense() {
  const addPoint = useUserStore((state) => state.addPoint);
  const userName = useUserStore((state) => state.userName);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-muted/50 p-8 rounded-3xl border-2 border-dashed text-center">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-bold">Welcome to Expenses, {userName}!</h2>
        <p className="text-muted-foreground mb-6">Manage your local budget here.</p>
        
        {/* THE ZUSTAND TEST */}
        <Button 
          // variant="secondary" 
          onClick={() => {
            addPoint();
            addPoint(); // Let's give 2 points for visiting!
          }}
        >
          Claim Daily Points (+2)
        </Button>
      </div>
      
      {/* Your regular expense logic goes here... */}
    </div>
  );
}