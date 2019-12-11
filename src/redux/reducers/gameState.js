import { PLAYER_NAMED, TOGGLE_TODO } from "../actionTypes";

const initialState = {
  score: 0,
  pname: ""
}

function deepCopy (oldObject) {
  return JSON.parse(JSON.stringify(oldObject))
}

export default function(state = initialState, action) {
  let newState = deepCopy(state)
  switch (action.type) {
    case PLAYER_NAMED: {
      const { pname } = action.payload
      newState.pname = pname
      return newState
    }
    default:
      return newState
  }
}
