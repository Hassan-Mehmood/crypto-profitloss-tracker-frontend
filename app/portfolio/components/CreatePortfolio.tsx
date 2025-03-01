"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { serverApi } from "@/app/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export default function CreatePortfolio() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["create-portfolio"],
    mutationFn: async (credentials: z.infer<typeof formSchema>) => {
      const response = await serverApi.post("/portfolio/create", credentials);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      router.refresh();
      setOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={navigationMenuTriggerStyle() + " border p-2"}>
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Portfolio
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Create Portfolio</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogHeader>

        {error instanceof AxiosError && (
          <p className="text-center text-red-500">
            {error.response?.data.message || "Login failed"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
