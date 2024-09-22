import { RegistrationForm } from "./RegistrationForm";
import { z } from "zod";
import { schema } from "./registrationSchema";

export default function Home() {
  async function onFormData(formData: FormData) {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);
    if (parsed.success) {
      // Add data to the database
      return {
        message: "User registered via server action and form data",
        data: parsed.data,
      };
    } else {
      return { error: parsed.error };
    }
  }
  async function onFormDataState(
    previousState: { message: string },
    formData: FormData
  ) {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);
    if (parsed.success) {
      // Add data to the database
      return {
        message: "User registered via server action and form data",
        data: parsed.data,
      };
    } else {
      return { error: parsed.error };
    }
  }
  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm
        onFormData={onFormData}
        onFormDataState={onFormDataState}
      />
    </div>
  );
}
