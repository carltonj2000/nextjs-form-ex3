"use server";
import { z } from "zod";
import { schema } from "./registrationSchema";

export async function onFormData(data: z.infer<typeof schema>) {
  const parsed = schema.safeParse(data);
  if (parsed.success) {
    // Add data to the database
    return {
      message: "User registered via server action",
      data: parsed.data,
    };
  } else {
    return { error: parsed.error };
  }
}
