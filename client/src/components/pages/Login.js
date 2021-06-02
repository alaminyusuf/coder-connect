import React from 'react'

const Login = () => (
  <div style={{ margin: '2em 0' }}>
    <form className="ui form">
      <div className="field">
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="text" name="password" placeholder="Password" />
      </div>
      <button className="ui secondary button" type="submit">
        Log In
      </button>
    </form>
  </div>
)

export default Login
