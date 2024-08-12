"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

import { signUpFormSchema as formSchema } from "../validation/signUpFormValidation";

const SignupForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: undefined,
      gender: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      age: values.age ? parseInt(values.age, 10) : undefined,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/signup",
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          profilePicture: "ABC",
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left w-full"
      >
        <SignupFormField
          name="name"
          label="Name"
          placeholder="Name"
          description="At least 3 characters."
          formControl={form.control}
        />
        <SignupFormField
          name="email"
          label="Email"
          placeholder="Email"
          inputType="email"
          formControl={form.control}
        />
        <SignupFormField
          name="password"
          label="Password"
          placeholder="Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          description="Must match the password."
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField
          name="age"
          label="Age"
          placeholder="Age"
          description="Must be at least 18 years old."
          formControl={form.control}
          inputType="number"
        />
        <SignupFormSelect
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          formControl={form.control}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <Button type="submit">Signup</Button>
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

interface SignupFormSelectProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
  options: { value: string; label: string }[];
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
              onChange={(e) => {
                inputType === "number"
                  ? field.onChange(e.target.valueAsNumber)
                  : field.onChange(e.target.value);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SignupFormSelect: React.FC<SignupFormSelectProps> = ({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SignupForm;
