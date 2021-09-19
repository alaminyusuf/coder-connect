import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import { loginUser } from '../../store/ducks/user'

const Login = () => {
  const dipatch = useDispatch()
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })
  const { error, isAuthenticated } = useSelector(state => state.user)

  const emailFieldError = error && error.field === 'email'
  const passwordFieldError = error && error.field === 'password'

  const handleSubmit = async e => {
    e.preventDefault()
    await dipatch(loginUser(fields))
  }

  const handleChange = e => {
    const value = e.target.value
    setFields({
      ...fields,
      [e.target.name]: value,
    })
  }

  return (
    <div style={{ margin: '2em 0' }}>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            {emailFieldError && <div>{error.info} </div>}
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={fields.email}
              placeholder="Email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            {passwordFieldError && <div>{error.info} </div>}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={fields.password}
              placeholder="Password"
            />
          </div>
          <input className="ui secondary button" type="submit" value="Log In" />
        </form>
      )}
    </div>
  )
}

export default Login
