import { Link } from 'react-router-dom';
import { User } from '../interfaces/interfazUser';


// Definimos una interfaz NavBarProps que describe las propiedades que recibe el componente NavBar
 export interface NavBarProps {
    user: User | null; 
}

// Definimos el componente funcional NavBar
const NavBar: React.FC<NavBarProps> = ({ user }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 top-0">
                <div className="container-fluid">
                    <img src="../src/assets/imgs/icon2.png" alt="" />
                    <a className="navbar-brand" href="#">MarketStore</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link to={"homeproducts"}>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Tienda</a>
                                </li>
                            </Link>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={"/homeproducts"}>
                                            <a className="dropdown-item volver" href="#">Volver</a>
                                        </Link>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <Link to={"cart"}>
                                <li className="nav-item">
                                    <a className="nav-link " aria-disabled="true">Carrito</a>
                                </li>
                            </Link>
                        </ul>
                        <form className="d-flex align-items-center" role="search">
                            <Link to="/login">
                                <button className="btn btn-warning me-2">Login</button>
                            </Link>
                            <div className="">
                                {user &&
                                    <span className="navbar-text">{user.name}</span>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
