import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background m-">
    <h1>
      HOMEPAGE
    </h1>
    <div >
    <Button onClick={() => navigate("dashboard")}>Go to dashboard</Button>
      <Button onClick={() => navigate("sign-up")}>Go to signup</Button>
    </div>
    </div>
  )
}