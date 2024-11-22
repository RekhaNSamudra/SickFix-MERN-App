import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const currencySymbol = "$";

  return (
    <AppContext.Provider value={{ doctors, currencySymbol }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
