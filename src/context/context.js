import { createContext, useContext, useEffect, useState } from "react";

const AddContext = createContext();

export function useLocalContext(){
    return useContext(AddContext);
}

export function ContextProvider({children}){
    const [createClassDialog, setCreateClassDialog] = useState(false);

    const value = { createClassDialog, setCreateClassDialog};
    return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}