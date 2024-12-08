import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classnames. Ensure this is defined in your project or replace with your own.

export const Tabs = ({ value, onValueChange, className, children }) => {
  return (
    <div className={cn("tabs-container", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child, { value, onValueChange });
        }
            return child;
      })}
    </div>
  );
};

export const TabsList = ({ value, onValueChange, children, className }) => {
  return (
    <div className={cn("tabs-list flex", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger = ({ value: tabValue, onValueChange, children, className, value }) => {
  const isActive = tabValue === value;

  return (
    <button
      className={cn(
        "tabs-trigger px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300",
        className
      )}
      onClick={() => onValueChange(tabValue)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, activeValue, className }) => {
  if (value !== activeValue) return null;

  return (
    <div className={cn("tabs-content p-4", className)}>
      {children}
    </div>
  );
};
