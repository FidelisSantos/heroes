import { createContext } from "react";
import TAppContext from "../types/TAppContext";

const AppContext = createContext<TAppContext>({
    loading: false,
    setLoading: () => {},
});

export default AppContext