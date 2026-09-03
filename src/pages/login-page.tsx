import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { Lock } from "lucide-react";

const userSchema = z.object({
  // name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserFormValues = z.infer<typeof userSchema>;

const LoginPage = () => {
const navigate = useNavigate()
const login = useAuthStore((state) => state.login); 
const currentUser = useAuthStore.getState().currentUser;


const form = useForm({
  resolver: zodResolver(userSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

const handleLogin = (data: any) => {
  // if(data.email !== currentUser?.email || data.password !== currentUser?.password) {
  //   form.setError("email", {
  //     type: "manual",
  //     message: "Invalid email or password. Please try again.",
  //   });
  //   return;
  // }
    const canEnter = login(data.email, data.password);
    console.log("User Data:", data);
    if(canEnter) {
      navigate("/dashboard")
    } else {
      form.setError("email", {
        type: "manual",
        message: "Invalid email or password. Please try again.",
    })
    }
}

return (
  <div>

     <div className="flex justify-center items-center min-h-screen min-w-10">
        <Card className="border grid shadow-lg w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-600" /> New Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-light"/>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
                  <p className="text-sm">no account yet? <Link to="/sign-up" className="hover:underline text-destructive">SIGN-UP</Link></p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  </div>
)
}
export default LoginPage;