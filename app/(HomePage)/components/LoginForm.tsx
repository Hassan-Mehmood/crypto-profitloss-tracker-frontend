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
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: z.infer<typeof formSchema>) => {
      const response = await serverApi.post("/users/signin", credentials);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      // Add additional success handling here (e.g., redirect, store token, etc.)
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  return (
    <Dialog>
      <DialogTrigger className={navigationMenuTriggerStyle()}>
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Login</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} type="password" />
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

        {error && (
          <p className="text-center text-red-500">
            {error.response.data.message || "Login failed"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
