import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const Navbar = () => {
const [dark, setDark] = useState(false);
  return (
    <main className="flex-1">
      <header className="flex h-16 items-center justify-between border-b bg-card/50 backdrop-blur px-5 md:px-8">
        <div>
          <p className="text-xs text-muted-foreground">Practice Lab</p>
          {/* <h1 className="text-sm font-semibold">{current.label}</h1> */}
        </div>
        <Button
          variant="outline"
          size="sm"
          className=""
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </header>
    </main>
  );
};
