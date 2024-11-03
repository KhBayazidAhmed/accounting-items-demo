import React, { createContext, useState, ReactNode, useContext } from "react";

// Define and export the context
export const IsOpenContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

// ItemsProvider component
export default function ItemsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
}

// Custom hook for consuming the context
export function useIsOpen() {
  const context = useContext(IsOpenContext);
  if (!context) {
    throw new Error("useIsOpen must be used within an ItemsProvider");
  }
  return context;
}
