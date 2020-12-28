import React, { useContext } from "react";
import Auth from "./components/Auth";

import Ingredients from "./components/Ingredients/Ingredients";
import  {AuthContext}  from "./context/auth-context";

 const App: React.FC = () => {
    const authContext = useContext(AuthContext);

    let content :JSX.Element = <Auth />;
    if (authContext.isAuth) {
      content = <Ingredients />;
    }
    return  content ;

 };
export default App;
