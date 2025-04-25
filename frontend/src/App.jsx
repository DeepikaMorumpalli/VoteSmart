import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Welcome from './pages/Welcome';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import LoggedInUserInfo from './pages/LoggedInUserInfo';
import CastVote from './pages/CastVote';
// import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <> 
      <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path={'/welcome'} element={<Welcome />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          {/* <Route path={'/admin'} element={<AdminDashboard/>} /> */}
          <Route path={'/userDetails'} element={<LoggedInUserInfo/>} />
          <Route path={'/castVote'} element={<CastVote/>} />
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  )
}

export default App