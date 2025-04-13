import Loading from './components/Loading';
import Home from './pages/Home';
import './scss/style.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const { loading } = useSelector((state: RootState) => state.hero);
  return (
    <>
      <Home/>
      {loading && <Loading/>}
    </>
  )
}

export default App
