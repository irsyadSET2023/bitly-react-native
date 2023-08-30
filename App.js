import { createContext, useState } from "react";
import AppNavigator from "./src/navigation";
import AuthContextProvider from "./src/Context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
};

export default App;
