"use client";
import { User } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";

type SessionType = {
  user: User;
  expires: string;
};

type SessionContextProviderProps = {
  user: SessionType;
  isLoading: boolean;
  isLoggedIn: boolean;
};
const SessionContext = createContext<SessionContextProviderProps | null>(null);

export const UserSessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (session) {
      setIsLoading(false);
    }
  }, [session]);
  return (
    <SessionContext.Provider
      value={{ user: session, isLoading, isLoggedIn: session ? true : false }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// export const useUserSession = () => useContext(SessionContext);

export const useUserSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
};
