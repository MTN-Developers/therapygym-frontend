/* eslint-disable no-unused-vars */
"use client";
import { createContext, useContext } from "react";

type TranslationContextProviderProps = {
  locale: "ar" | "en";
};

const TranslationContext =
  createContext<TranslationContextProviderProps | null>(null);

export const TranslationContextProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: "ar" | "en";
}) => {
  return (
    <TranslationContext.Provider value={{ locale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationContextProvider"
    );
  }
  return context;
};
