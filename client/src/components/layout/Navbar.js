import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isSignUp = location.pathname === '/signup'

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
      ) : null}
    </div>
  )
}

export default Navbar
