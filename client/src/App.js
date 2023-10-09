import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from "./components/Routes/Private";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* Dashboard: Private(PrivateRoute) => authRoute =>  authMiddleware(requireSignIn) => 
        ok: <Outlet/>: <Dashboard />, false: <Spinner /> => login */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App