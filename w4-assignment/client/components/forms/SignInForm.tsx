"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";
import { set, z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signInFormSchema as formSchema } from "../validation/signInFormValidation";

const SignInForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isDirty, dirtyFields },
  } = form;

  console.log(isDirty);
  console.log(dirtyFields);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/signin",
        { email: values.email, password: values.password },
        {
          withCredentials: true,
        }
      );

      // Only navigate to the profile page if the sign-in is successful
      if (response.status === 200) {
        login(response);
        router.push("/profile");
      }
    } catch (error: any) {
      console.error(error);
      // Optionally handle error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left w-full"
      >
        <SignupFormField
          name="email"
          label="Email"
          placeholder="Email"
          inputType="email"
          formControl={form.control}
        />
        <div className="relative">
          <SignupFormField
            name="password"
            label="Password"
            placeholder="Password"
            description="At least 8 characters."
            inputType={showPassword ? "text" : "password"}
            formControl={form.control}
          />
          <button
            className="absolute right-2 top-10"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        <Button className="w-full" type="submit">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

interface SignupFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

const SignupFormField: React.FC<SignupFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SignInForm;
