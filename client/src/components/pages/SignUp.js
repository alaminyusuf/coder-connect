import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { signUpUser } from '../../store/ducks/user'

const SignUp = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const { isAuthenticated, error } = useSelector(state => state.user)
  const emailFieldError = error && error.field === 'email'
  const nameFieldError = error && error.field === 'name'
  const passwordFieldError = error && error.field === 'password'

  const handleSubmit = async e => {
    e.preventDefault()
    await dispatch(signUpUser(fields))
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
            <label htmlFor="name">Name</label>
            {nameFieldError && <div>{error.info} </div>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={fields.name}
              onChange={handleChange}
            />
          </div>
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
            {passwordFieldError && <div>{error.info} </div>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
              onChange={handleChange}
            />
          </div>
          <input className="ui secondary button" type="submit" value="Submit" />
        </form>
      )}
    </div>
  )
}

export default SignUp
