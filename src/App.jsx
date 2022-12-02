import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Purchases from './components/Purchases'
import ProductId from './components/ProductId'
import Login from './components/Login'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Container } from 'react-bootstrap'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <>
      <HashRouter>
        <NavBar />
        {
          isLoading && (
            <LoadingScreen />
          )
        }
        <Container className='my-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductId />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>
          </Routes>
        </Container>
      </HashRouter>
    </>
  )
}

export default App
