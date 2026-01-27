import { Routes , Route } from 'react-router-dom'
import DashboardLayout from '../pages/DashboardLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
const RouterProvider = ()=>{
    return <Routes>
      <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="test" element={<h1>Test</h1>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
    </Routes>
}

export default RouterProvider