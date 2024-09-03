import Router from "./Routes/Router";
import NavBar from "./componentes/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Layout from "./componentes/Layout";


function App() {

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <>  
        <Layout>
            <NavBar user={user} />
            <Router />
        </Layout>
        </>
    );
}

export default App;


