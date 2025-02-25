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

export const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2),
  password: z.string().min(6),
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      const response = await serverApi.post("/users/signup", formData);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    await mutateAsync(formData);
  }

  return (
    <Dialog>
      <DialogTrigger className={navigationMenuTriggerStyle()}>
        Signup
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Sign up</DialogTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
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
                {isPending ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogHeader>

        {error && (
          <p className="text-center text-red-500">
            {error.response.data.message || "Signup failed"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
