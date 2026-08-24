import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  status: z.enum(["Lead", "Client", "Archive"]),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

const MiniCRM = () => {
  return (
    <div className="flex flex-col gap-4">
      
    </div>
  )
}
export default MiniCRM