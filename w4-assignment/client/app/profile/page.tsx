"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";

const Page = () => {
  const [user, setUser] = useState(null);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push("/signin"); // Redirect if not authenticated
        } else {
          const data = await getUser(); // Fetch the user data
          if (data) {
            setUser(data);
          }
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, loading, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  console.log(user);

  return (
    <div className="w-[100vw] h-[100vh] flex text-center justify-center items-center p-4">
      <div className="flex flex-col gap-8">
        <div>Welcome, {user.name}</div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default Page;
