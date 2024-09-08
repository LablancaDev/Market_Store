import { Route, Routes } from 'react-router-dom'
import Home_Productos from '../paginas/Home_Products'
import Login from '../paginas/Login'
import Cart from '../paginas/Cart'
import MyPurchases from '../paginas/MyPurchases'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home_Productos />}/>
        <Route path='/homeproducts' element={<Home_Productos />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/mypurchases' element={<MyPurchases />}/>
    </Routes>
  )
}

export default Router