"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import { observeAuthState } from "@/lib/firebase/auth";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
