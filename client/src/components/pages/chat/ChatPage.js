import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllUsers } from '../../../store/ducks/user'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, users } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, isAuthenticated])

  return (
    <div className="ui container">
      {!isAuthenticated ? (
        <Redirect to="login" />
      ) : (
        <div className="mt-2">
          <div className="ui very relaxed divided list">
            {users.map(user => {
              return (
                <div className="item" key={user._id}>
                  <div className="content">
                    <a className="header tag">{user.name}</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPage
