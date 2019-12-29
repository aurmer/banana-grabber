import { PLAYER_NAMED, BANANA_MISSED, BANANA_FETCHED, BANANA_CREATED, START_LEVEL, BANANA_CLICKED, REPLAY } from '../actionTypes'
import { BASE_DELAY, DELAY_LEVEL_DELTA } from '../../constants'
import { createUUID, randomXPositionGivenSize } from '../../utilFunctions'

const initialState = {
  score: 0,
  gameStarted: false,
  gameOver: false,
  lives: 3,
  level: 0,
  dropDelay: BASE_DELAY,
  playerName: '',
  nextLevelOverlay: false,
  playedBananas: {},
  queuedBananas: {
    // banana_UUID: {
    //   id: banana_UUID,
    //   xPosition: xx,
    //   speedModifier: xx,
    //   sizeModifier: xx,
    //   value: 1,
    //   rotationOffset:
    // }
  },
}

function deepCopy (oldObject) {
  return JSON.parse(JSON.stringify(oldObject))
}

function populateLevelWithBananas(state, count) {
  const newState = deepCopy(state)
  const newBanana = buildBanana(newState)

  if(count > 1) {
    newState.queuedBananas[newBanana.id] = newBanana
    return populateLevelWithBananas(newState, count-1)
  } else if (count === 1) {
    newState.queuedBananas[newBanana.id] = newBanana
    return newState
  }

}

function calculateBananaCount(level) {
  return level
}

function buildBanana(state,animationDuration) {
  let speedModifier
  if(animationDuration) {
    speedModifier = animationDuration
  } else {
    speedModifier = (1/Math.pow(.9,state.level))
  }
  return {
    id: `banana_${createUUID()}`,
    xPosition: (randomXPositionGivenSize(1)),
    speedModifier: speedModifier,
    sizeModifier: 1,
    value: 1,
    rotationOffset: `${Math.random()*360}deg`
  }
}

function incrementGameLevel(state) {
  let newState = deepCopy(state)
  newState.level++
  newState.dropDelay = BASE_DELAY*Math.pow(DELAY_LEVEL_DELTA,state.level)
  newState.nextLevelOverlay = true
  return newState
}

export default function (state = initialState, action) {
  let newState = deepCopy(state)

  switch (action.type) {
    case PLAYER_NAMED: {
      const { playerName } = action.payload
      newState.playerName = playerName
      newState.gameStarted = true
      newState.playedBananas = {}
      newState = incrementGameLevel(newState)
      break
    }
    case START_LEVEL: {
      newState.nextLevelOverlay = false
      newState = populateLevelWithBananas(newState,calculateBananaCount(newState.level))
      break
    }
    case BANANA_FETCHED: {
      const bananasArray = Object.values(newState.queuedBananas)
      if(bananasArray.length) {
        const movedBanana = Object.values(newState.queuedBananas)[0]
        newState.playedBananas[movedBanana.id] = movedBanana
        delete newState.queuedBananas[movedBanana.id]
      }
      break
    }
    case BANANA_CREATED: {
      const newBanana = buildBanana(newState)
      newState.playedBananas[newBanana.id] = newBanana
      break
    }
    case BANANA_CLICKED: {
      const { banana_id } = action.payload
      newState.score += newState.playedBananas[banana_id].value
      delete newState.playedBananas[banana_id]
      if(Object.keys(newState.playedBananas).length === 0 && Object.keys(newState.queuedBananas).length === 0) {
        newState = incrementGameLevel(newState)
      }
      break
    }
    case BANANA_MISSED: {

      const { banana_id } = action.payload
      delete newState.playedBananas[banana_id]
      if(!newState.gameStarted || newState.gameOver) {break} //this is for the falling banana backdrop on welcome and game over
      newState.lives--


      if(newState.lives === 0 ) {
        newState.gameOver = true
        newState.level = 0
        newState.playedBananas = {}
      }
      else if(Object.keys(newState.playedBananas).length === 0 && Object.keys(newState.queuedBananas).length === 0) {
        newState = incrementGameLevel(newState)
      }
      break
    }
    case REPLAY: {
      newState = initialState
      break
    }
    default: {

    }
  }
  return newState
}
