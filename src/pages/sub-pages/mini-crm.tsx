import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Mail,
  UserPlus,
  Users,
  Trash2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useActivityStore } from "@/store/useActivityStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useClientStorageKey } from "@/hooks/use-storage-key";

// 1. ZOD SCHEMA
const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  status: z.enum(["Lead", "Client", "Pro"], {
    required_error: "Please select a status",
  }),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface Client extends ClientFormValues {
  id: number;
}

const MiniCRM = () => {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const storageKey = useClientStorageKey();
  const points = useUserStore((state) => {
    // 1. Get the current user's email
    currentUser ? (state.pointsByUser[currentUser.email] ?? 0) : 0;
    const userEmail = currentUser?.email;

    if (!userEmail) return 0;
    return state.pointsByUser?.[userEmail] || 0;
  });
  const addPoint = useUserStore((state) => state.addPoint);
  const navigate = useNavigate();
  // 2. REACT HOOK FORM SETUP
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "Lead",
    },
  });
  // const points =

  const fetchClients = async (): Promise<Client[]> => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  };

  const { data: clients = [], isLoading: isLoadingDetails } = useQuery({
    queryKey: ["clients", storageKey],
    queryFn: fetchClients,
    refetchOnWindowFocus: false, // DON'T refetch when I click the alert 'OK'
    refetchOnMount: false, // DON'T refetch when I switch pages and come back
    refetchOnReconnect: false,
  });

  // const { data: clients, isLoading: isLoadingDetails } = useQuery({
  //   queryKey: ["clients"],
  //   queryFn: async () => fetchClients(),
  //   staleTime: 1000 * 60 * 5, // Trust the cache for 5 minutes
  //   refetchOnWindowFocus: false, // DON'T refetch when I click the alert 'OK'
  //   refetchOnMount: false, // DON'T refetch when I switch pages and come back
  //   refetchOnReconnect: false,
  // });

  const addLog = useActivityStore((state) => state.addLog);

  // const addMutation = useMutation({
  //   mutationFn: async (newClient: ClientFormValues) => {
  //     try {
  //       const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newClient),
  //       });
  //       if (!res) throw new Error("Failed to fetch clients");
  //       // return newClient['name'];
  //     } catch (error) {
  //       return newClient;
  //     }
  //   },
  //   onSuccess: (newItem) => {
  //     // 1. Create the object WITH the status FIRST
  //     const itemWithStatus = {
  //       ...newItem,
  //       status: form.getValues("status"),
  //     };

  //     // 2. Then update the cache with that object
  //     queryClient.setQueryData(["clients"], (oldData: any) => {
  //       return oldData ? [...oldData, itemWithStatus] : [itemWithStatus];
  //     });

  //     // 3. Reward & Reset
  //     addPoint(10);
  //     form.reset();
  //     alert("Success! 10 XP added to your profile.");
  //     addLog({
  //       text: `Client "${itemWithStatus.name}" was added (+10 XP)`,
  //       type: "client",
  //     });
  //   },
  // });

  const addClientMutation = useMutation({
    mutationFn: async (newClient: ClientFormValues) => {
      const currentClients = await fetchClients();
      const clientWithId: Client = { ...newClient, id: Date.now() };
      const updatedClients = [...currentClients, clientWithId];
      localStorage.setItem(storageKey, JSON.stringify(updatedClients));
      return clientWithId; // return just the ONE new client
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(["clients", storageKey], (oldData: any) => {
        return oldData ? [...oldData, newItem] : [newItem];
      });
      addPoint(10);
      form.reset();
      alert("Success! 10 XP added to your profile.");
      addLog({
        text: `Client "${newItem.name}" was added (+10 XP)`,
        type: "client",
      });
    },
  });

  // const deleteMutation = useMutation({
  //   mutationFn: async (client: { id: number; name: string }) => {
  //     await fetch(`https://jsonplaceholder.typicode.com/users/${client.id}`, {
  //       method: "DELETE",
  //     });
  //     return client; // pass it through so onSuccess can use it
  //   },
  //   onSuccess: (deletedClient) => {
  //     queryClient.setQueryData(["clients", storageKey], (oldData: any) => {
  //       return oldData?.filter((client: any) => client.id !== deletedClient.id);
  //     });
  //     alert("Client removed from view!");
  //     addLog({
  //       text: `Client "${deletedClient.name}" was removed`,
  //       type: "client",
  //     });
  //   },
  // });

  const deleteMutation = useMutation({
    mutationFn: async (client: Pick<Client, "id" | "name">) => {
      const currentClients = await fetchClients();
      const updatedClients = currentClients.filter(
        (c) => String(c?.id) !== String(client.id),
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedClients));
      return client;
    },
    onSuccess: (deletedClient) => {
      queryClient.setQueryData(["clients", storageKey], (oldData: any) => {
        return (oldData ?? []).filter(
          (client: Client) => String(client.id) !== String(deletedClient.id),
        );
      });
      alert("Client removed from view!");
      addLog({
        text: `Client "${deletedClient.name}" was removed`,
        type: "client",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients", storageKey] });
    },
  });
  // 3. SUBMIT HANDLER (Connect your useMutation here later)
  const onSubmit = async (data: ClientFormValues) => {
    const currentClients = await fetchClients();
    const exists = currentClients.find(
      (client: any) => client?.email.toLowerCase() === data?.email.toLowerCase(),
    );
    if (exists) {
      console.log("onSubmit fired", data)
      alert("A client with this email already exists!");
      return;
    }
    addClientMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pro":
        return <Badge className="bg-purple-600 text-white">{status}</Badge>;
      case "Client":
        return <Badge className="bg-green-600 text-white">{status}</Badge>;
      default:
        return <Badge className="bg-blue-700 text-white">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* HEADER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/70 uppercase text-[10px] font-bold">
              Workspace Status
            </CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> {points} XP
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> CRM Dashboard
            </CardTitle>
            <CardDescription>
              Manage your clients and track your learning progress.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: SHADCN FORM */}
        <Card className="lg:col-span-1 border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-600" /> New Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background text-primary">
                          <SelectItem value="Lead">Lead</SelectItem>
                          <SelectItem value="Client">Client</SelectItem>
                          <SelectItem value="Pro">Pro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    addClientMutation;
                  }}
                >
                  Create Contact
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: CLIENT LIST */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Active Network
            </h3>
            <Badge variant="outline">Live Sync</Badge>
          </div>

          <div className="grid gap-3">
            {/* REPLACE THIS PLACEHOLDER WITH data?.map(...) FROM useQuery */}
            {clients
              ?.filter((c: any) => c && c.id)
              .map((client: any) => (
                <Link to={`/dashboard/clients/${client.id}`} state={client}>
                  <Card
                    key={client.id}
                    className="hover:border-blue-200 transition-colors cursor-pointer group"
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {client.id}
                        </div> */}
                        <div>
                          <p className="font-bold text-sm capitalize">
                            {client.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {client.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {getStatusBadge(client.status || "Lead")}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive transition-colors z-40"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            deleteMutation.mutate({
                              id: client.id,
                              name: client.name,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCRM;
