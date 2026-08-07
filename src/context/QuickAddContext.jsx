import {createContext, useContext, useState} from "react";

const QuickAddContext = createContext();

export function QuickAddProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [defaultType, setDefaultType] = useState("expense");

  const openQuickAdd = (type = "expense") => {
    setDefaultType(type);
    setOpen(true);
  };

  return(
        <QuickAddContext.Provider
            value={{ open, setOpen, defaultType, setDefaultType, openQuickAdd, }}
         >
            {children}
         </QuickAddContext.Provider>   
  );
}

    export function useQuickAdd() {
       return useContext((QuickAddContext));
    }

