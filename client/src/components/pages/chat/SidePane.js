import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Loading from '@layout/Loading'

// import redux store
import { connect } from 'react-redux'
import { getItems } from '@actions/userActions'
import PropTypes from 'prop-types'

const SidePane = ({ user }) => {
  useEffect(() => {
    getItems()
  }, [])

  const { users } = user
  // console.log(props.user)
  // if (loading) {
  //   return <Loading />
  // } else {
  return (
    <Body>
      {users.flatMap(({ id, name }) => (
        <div key={id}>
          <NavLink to={`/chat/${id}`} activeStyle={{ color: 'blue' }}>
            <Div>{name}</Div>
          </NavLink>
        </div>
      ))}
    </Body>
  )
  // }
}

SidePane.propTypes = {
  getItems: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const Body = styled.div`
  padding: 0;
  height: 100%;
  margin: auto;
  /* display: flex; */
  text-align: center;
  /* background-color: ${({ theme }) => theme.primary}; */
  /* align-items: center; */
  width: 60%;
  div {
    a {color: #000;
    }
    /* text-align: center; */
    /* justify-content: center; */
    /* align-items: center; */
    margin: auto;
    width: 95%;
    margin-top: 1px;
    color: #000;
  height: 2.5rem;
    /* margin-top: 1.5rem;
    margin-bottom: 1.5rem; */
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`

const Div = styled.div`
  border-bottom: #ccc solid;
`

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { getItems })(SidePane)
