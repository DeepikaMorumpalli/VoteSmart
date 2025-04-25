import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Welcome from './pages/Welcome';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CastVote from './pages/CastVote';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <> 
      <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path={'/welcome'} element={<Welcome />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/vote'} element={<CastVote />} />
          <Route path={'/results'} element={<ResultPage />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  )
}
