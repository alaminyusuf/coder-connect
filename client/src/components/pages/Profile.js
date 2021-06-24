import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const Settings = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  return (
    <div>
      {!isAuthenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <h2 className="ui center aligned icon header">
            <i className="circular user icon"></i>
            Profile Name
          </h2>
          <div>
            <div className="ui modal">
              <div className="header">Edit Profile</div>
              <i className="close icon"></i>
              <div className="content">
                <form className="ui form">
                  <div className="field">
                    <label>Name</label>
                    <input type="text" name="email" placeholder="Email" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" />
                  </div>
                </form>
              </div>
              <div className="actions">
                <div className="ui positive right labeled icon button">
                  Save
                  <i className="checkmark icon"></i>
                </div>
              </div>
            </div>
            <div className="ui very relaxed divided list">
              <div className="item">Name</div>
              <div className="item">Email</div>
            </div>

            <button
              onClick={() => $('.ui.modal').modal('show')}
              className="ui secondary button mt-2"
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Settings
