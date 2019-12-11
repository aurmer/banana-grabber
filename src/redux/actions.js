import { PLAYER_NAMED, TOGGLE_TODO, SET_FILTER } from './actionTypes'

export const playerNamed = pname => ({
  type: PLAYER_NAMED,
  payload: {
    pname
  }
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
})

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } })
