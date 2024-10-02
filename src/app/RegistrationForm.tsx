"use client";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { schema } from "./registrationSchema";
import { onJsonData } from "./RegistrationActions";
import { useRef } from "react";

export const RegistrationForm = ({
  onFormData,
  onFormDataState,
}: {
  onFormData?: (data: FormData) => Promise<void>;
  onFormDataState?: (
    previousState: { message: string },
    formData: FormData
  ) => Promise<{ message?: string; data?: any; error?: string }>;
}) => {
  const [state, formAction] = useFormState(onFormDataState, { message: "" });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onSubmit2 = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);
    fetch("/api/registerForm", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onSubmit3 = async (data: z.infer<typeof schema>) => {
    const result = await onJsonData(data);
    console.log(result);
  };

  const onSubmit4 = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);
    if (!onFormData) {
      console.log("onFormData not defined");
      return;
    }
    const result = await onFormData(formData);
    console.log(result);
  };

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      <div>{state?.message}</div>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
      {/* <form onSubmit={form.handleSubmit(onSubmit2)} className="space-y-8"> */}
      {/* <form onSubmit={form.handleSubmit(onSubmit3)} className="space-y-8"> */}
      {/* <form onSubmit={form.handleSubmit(onSubmit4)} className="space-y-8"> */}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your Last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
