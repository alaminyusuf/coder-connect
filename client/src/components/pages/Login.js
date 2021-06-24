import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/ducks/user'
import { useFormik } from 'formik'
import { Redirect } from 'react-router'

const Login = () => {
  const dipatch = useDispatch()
  const { error, isAuthenticated } = useSelector(state => state.user)

  const emailFieldError = error && error.field === 'email'
  const passwordFieldError = error && error.field === 'password'
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, actions) => {
      dipatch(loginUser(values))
      actions.resetForm({
        values: {
          email: '',
          password: '',
        },
      })
    },
  })

  return (
    <div style={{ margin: '2em 0' }}>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <form className="ui form" onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            {emailFieldError && <div>{error.info} </div>}
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            {passwordFieldError && <div>{error.info} </div>}
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
