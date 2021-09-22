import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/ducks/user'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.user)
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isSignUp = location.pathname === '/signup'

  const signOut = async () => {
    await dispatch(logout())
  }

  return (
    <div className="ui menu">
      <Link to="/" className="ui item">
        Home
      </Link>
      {isLogin || isSignUp ? null : (
        <>
          <Link to="/profile" className="ui item">
            Profile
          </Link>
        </>
      )}
      {!isAuthenticated ? (
        <div className="right item">
          {isLogin ? null : (
            <Link to="/login" className="ui item secondary">
              Log In
            </Link>
          )}
          {isSignUp ? null : (
            <Link to="/signup" className="ui item secondary">
              Sign Up
            </Link>
          )}
        </div>
      ) : (
        <div className="right item">
          <div onClick={() => signOut()} className="ui item">
            Logout
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
