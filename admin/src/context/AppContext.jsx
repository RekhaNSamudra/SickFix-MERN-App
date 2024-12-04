import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = '₹'
  const calculateAge = (dob) => {
    console.log("dob", dob)
    const today = new Date();
    const birthday = new Date(dob);

    let age = today.getFullYear() - birthday.getFullYear();
    return (age);
  };

  return (
    <AppContext.Provider value={{ calculateAge, currency }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
