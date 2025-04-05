import Loading from './components/Loading';
import AppContext from './context/AppContext';
import useApp from './hooks/useApp';
import Home from './pages/Home';
import './scss/style.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const {loading, setLoading} = useApp();
  return (
    <Provider store={store}>
      <AppContext.Provider value={{ loading, setLoading}}>
        <Home/>
        {loading && <Loading/>}
      </AppContext.Provider>
    </Provider>
  )
}

export default App
