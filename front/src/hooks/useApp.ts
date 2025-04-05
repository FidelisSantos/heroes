import { useContext } from "react"
import AppContext from "../context/AppContext"

function useApp()
{
    return useContext(AppContext);
}

export default useApp