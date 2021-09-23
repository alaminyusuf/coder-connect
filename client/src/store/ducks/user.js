import Axios from 'axios'
import {
  LOGIN_USER,
  GET_ALL_USERS,
  CREATE_ERROR,
  CREATE_USER,
  LOGOUT,
  CLEAR_ERROR,
} from '../constants'

const initialState = {
  users: [],
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  token: sessionStorage.getItem('connect'),
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }

    case CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      }

    case LOGIN_USER:
      sessionStorage.setItem('connect', action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthenticated: true,
        loading: false,
      }

    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default Reducer

const USER_URI = 'http://localhost:4100/api/users'

export const getAllUsers = () => async dispatch => {
  try {
    await Axios.get(USER_URI).then(users => {
      dispatch({ type: GET_ALL_USERS, payload: users.data.response })
    })
  } catch (error) {
    dispatch({ type: CREATE_ERROR, payload: error.response.data.response })
  }
}

export const loginUser = data => async dispatch => {
  try {
    const res = await (
      await Axios.post('http://localhost:4100/api/user/login', data)
    ).data
    dispatch({ type: LOGIN_USER, payload: res.response.user })
  } catch (error) {
    dispatch({ type: CREATE_ERROR, payload: error.response.data.response })
    setTimeout(() => dispatch({ type: CLEAR_ERROR }), 4000)
  }
}

export const signUpUser = data => async dispatch => {
  try {
    const res = await (await Axios.post('http://localhost:4100/api/users', data))
      .data
    dispatch({ type: CREATE_USER, payload: res.response.user })
  } catch (error) {
    dispatch({ type: CREATE_ERROR, payload: error.response.data.response })
    setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000)
  }
}

export const logout = () => async dispatch => {
  await dispatch({ type: LOGOUT })
}
