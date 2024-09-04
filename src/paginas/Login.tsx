import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser, setError } from '../redux/reducers/authSlice';
import { registerNewUser, loginUser } from "../controllers/authController";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

   
    const user = useSelector((state: RootState) => state.auth.user); 
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const [localUser, setLocalUser] = useState<string>(user?.name || ''); 
    const [password, setPassword] = useState<string>(user?.password || ''); 
    const [email, setEmail] = useState<string>(user?.email || ''); 
    const [changeRegAuth, setChangeRegAuth] = useState<boolean>(false); 
    const [messageLogin, setMessageLogin] = useState<string>('')
    const [messageRegister, setMessageRegister] = useState<string>('')

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userData = await registerNewUser(localUser, password, email);
            dispatch(setUser({ id: userData.id || 0, name: localUser, password, email }));
            setMessageRegister('Registro correcto! Puedes iniciar sesión...');
        } catch (error) {
            console.error('Error durante el registro:', error);
           
        }
    };

  
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); 
     
        try {
            const userData = await loginUser(email, password);

          
            dispatch(setUser({ id: userData.id || 0, name: userData.user, password: userData.password, email: userData.email }));
            
            setMessageLogin('Logeado correctamente! Redirigiendo...');
            setTimeout(() => {
                navigate('/homeproducts'); 
            }, 2000);
            console.log("Usuario encontrado!!!")
        } catch (error) {
            console.error('Error al logerse:', error);
            dispatch(setError('Credenciales invalidas')); 
        }
    };

    
    const close_session = () => {
        dispatch(setUser({ id: 0, name: '', password: '', email: '' }));
        navigate("/homeproducts")
    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form action="" onSubmit={changeRegAuth ? handleLogin : handleRegister}>
                            <div className='card p-3 w-50 m-auto my-5 transparent-bg text-light'>
                                <h2 className='m-auto my-3 text-light'>
                                    {changeRegAuth ? 'Login' : 'Register'}
                                   
                                </h2>
                                <div className='m-auto d-flex flex-column mb-3'>
                                    <label className='form-label me-1' htmlFor="email">Email: </label>
                                    <input
                                        id='email'
                                        className='form-input'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                  
                                    />
                                </div>
                                <div className='m-auto d-flex flex-column mb-3'>
                                    <label className='form-label me-1' htmlFor="password">Password: </label>
                                    <input
                                        id='password'
                                        className='form-input'
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                  
                                    />
                                </div>
                                {!changeRegAuth && (
                                    <div className='m-auto d-flex flex-column'>
                                        <label className='form-label me-2' htmlFor="name">Nombre: </label>
                                        <input
                                            id='name'
                                            className='form-input'
                                            type="text"
                                            value={localUser}
                                            onChange={(e) => setLocalUser(e.target.value)}
                                            required
                                       
                                        />

                                    </div>
                                )}
                                <button className={`btn mt-3 w-25 m-auto ${changeRegAuth ? 'btn-success' : 'btn-danger'}`} type="submit">
                                    {changeRegAuth ? 'Login' : 'Register'}
                                 
                                </button>
                                <a onClick={() => setChangeRegAuth(!changeRegAuth)} className="text-center mt-2" href="#" role="button">
                                    {changeRegAuth ? '¿Regístrate?' : 'Iniciar Sesión'}
                                   
                                </a>
                                {changeRegAuth ? <div className="text-center text-success my-2">{messageLogin}</div> : <div className="text-center text-success my-2">{messageRegister}</div>}
                                {loading && <p>Loading...</p>}
                               
                                {error && <p className="error">{error}</p>}
                              
                                <div className="text-end">
                                    <button type="button" onClick={close_session} className="btn btn-warning m-auto ">Cerrar Sesión</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

