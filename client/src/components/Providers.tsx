"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface Props extends ThemeProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children,  ...props }: Props) => {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
};

export default Providers;
