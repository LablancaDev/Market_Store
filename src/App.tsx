import Router from "./Routes/Router";
import NavBar from "./componentes/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from './redux/store'; 


function App() {

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <>
            <NavBar user={user} />
            <Router />
        </>
    );
}

export default App;


