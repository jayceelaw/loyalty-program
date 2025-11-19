'use client';
import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionID, setTransactionID] = useState();
  return (
    <TransactionContext.Provider value={{ transactionID, setTransactionID }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);