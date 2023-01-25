import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../store/authContext'
import { Button } from 'react-bootstrap'


const Header = () => {
  const authCtx = useContext(AuthContext)

  return (
    <div>
      {!authCtx.token && <NavLink to='/'>Landing</NavLink> }
      {authCtx.token && <div>
      <NavLink to='/Dashboard'>Dashboard</NavLink>
      <NavLink to='/Profile'>Profile</NavLink>
      <NavLink to='/Messages'>Messages</NavLink>
      <Button variant='primary' onClick={() => authCtx.logout()}>Logout</Button>
      </div>}
    </div>
  )
}

export default Header
