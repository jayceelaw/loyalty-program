'use client';
import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navStack, setNavStack] = useState([]);
  return (
    <NavigationContext.Provider value={{ navStack, setNavStack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);