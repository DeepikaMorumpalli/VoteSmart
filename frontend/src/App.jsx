import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Welcome from './pages/Welcome';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path={'/welcome'} element={<Welcome />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App