import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

  return (
    <DoctorContext.Provider value={{}}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider