import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = '₹'
  
  return (
    <AppContext.Provider value={{ calculateAge, currency }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
