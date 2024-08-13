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
import { useToast } from "@/components/ui/use-toast";
import { updateFormSchema as formSchema } from "../validation/updateFormValidation";

const ProfileForm = ({ user }: { user: any }) => {
  const { toast } = useToast();
  const handleLogout = async () => {
    console.log("Logged out 1");
    try {
      await axios
        .post("http://127.0.0.1:4000/api/logout", {
          withCredentials: true,
        })
        .then(() => {
          console.log("Logged out");
          router.push("/signin");
        });
    } catch (error) {
      console.error(error);
    }
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      age: user.age,
      gender: user.gender,
    },
  });

  // Extract isDirty from formState
  const {
    formState: { isDirty, dirtyFields },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (values.oldPassword === values.newPassword) {
      toast({
        variant: "destructive",
        title: "New Password Cannot Be Same As Old Password",
      });
      return;
    }
    const formData = {
      ...values,
      age: values.age ? parseInt(values.age, 10) : undefined,
    };
    console.log("formData", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/profile",
        {
          name: formData.name,
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
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
        className="space-y-4 text-left w-full flex flex-col"
        autoComplete="off"
      >
        <div className="flex gap-4">
          <ProfileFormField
            name="name"
            label="Name"
            placeholder="Name"
            description="At least 3 characters."
            formControl={form.control}
          />
          <ProfileFormField
            name="email"
            label="Email"
            placeholder="Email"
            inputType="email"
            formControl={form.control}
          />
        </div>

        <ProfileFormField
          name="oldPassword"
          label="Old Password"
          placeholder="Old Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <ProfileFormField
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <ProfileFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          description="Must match the new password."
          inputType="password"
          formControl={form.control}
        />

        <div className="flex gap-4">
          <div className="w-full">
            <ProfileFormField
              name="age"
              label="Age"
              placeholder="Age"
              description="Must be at least 18 years old."
              formControl={form.control}
              inputType="number"
            />
          </div>

          <div className="w-full">
            <ProfileFormSelect
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              formControl={form.control}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>
        </div>

        <Button type="submit" disabled={!isDirty}>
          Update
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </form>
    </Form>
  );
};

interface ProfileFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

const ProfileFormField: React.FC<ProfileFormFieldProps> = ({
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

interface ProfileFormSelectProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
  options: { value: string; label: string }[];
}

const ProfileFormSelect: React.FC<ProfileFormSelectProps> = ({
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

export default ProfileForm;
