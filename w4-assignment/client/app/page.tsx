"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push("/signin"); // Redirect if not authenticated
        } else {
          router.push("/profile");
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, loading, router]);
}
