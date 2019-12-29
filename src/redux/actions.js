import { PLAYER_NAMED, BANANA_MISSED, BANANA_FETCHED, BANANA_CREATED, BANANA_CLICKED, START_LEVEL, REPLAY } from './actionTypes'

export const playerNamed = playerName => ({
  type: PLAYER_NAMED,
  payload: { playerName }
})



export const clickedBanana = id => ({
  type: BANANA_CLICKED,
  payload: { banana_id: id }
})

export const missedBanana = id => ({
  type: BANANA_MISSED,
  payload: { banana_id: id }
})

export const fetchedBanana = () => ({
  type: BANANA_FETCHED,
  payload: { }
})

export const createdBanana = () => ({
  type: BANANA_CREATED,
  payload: { }
})

export const replay = () => ({
  type: REPLAY,
  payload: { }
})

export const startLevel = () => ({
  type: START_LEVEL,
  payload: { }
})
