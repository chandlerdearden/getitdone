import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './store/authContext';

import Header from './components/header/Header'
import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Profile from './components/profile/Profile';

const App = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      {authCtx.token && <Header/>}
      <Routes>
        <Route path = '/' element = {!authCtx.token ?<Landing/> : <Navigate to='/Dashboard'/>}/>
        <Route path = '/Dashboard' element = {authCtx.token ?<Dashboard/> : <Navigate to='/'/>}/>
        <Route path = '/Messages' element = {authCtx.token ? <Messages/> : <Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
