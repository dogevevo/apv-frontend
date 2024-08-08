import { useContext } from "react";
import AuthContext from "../context/AuthProviders";

const useAuth = () => {

    return useContext(AuthContext); 
23
}

export default useAuth