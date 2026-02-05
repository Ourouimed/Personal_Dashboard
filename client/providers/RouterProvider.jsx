import { Routes , Route } from 'react-router-dom'
import DashboardLayout from '../pages/DashboardLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Projects from '../pages/Projects'
import Error404 from '../pages/Error404'
import Timeline from '../pages/Timeline'
const RouterProvider = ()=>{
    return <Routes>
      <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="projects" element={<Projects/>}/>
          <Route path="timeline" element={<Timeline/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Error404/>}/>
    </Routes>
}

export default RouterProvider