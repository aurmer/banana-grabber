import {WINDOW_HEIGHT, WINDOW_WIDTH, BASE_SIZE, BASE_DELAY} from './constants'

export const createUUID = () => {
  // eslint-disable-next-line
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const randomXPositionGivenSize = (sizeModifier) => {
  const maxX = WINDOW_WIDTH-(BASE_SIZE*1.1*sizeModifier)
  return Math.floor( Math.random()*maxX )
}

export const maxYGivenSize = (sizeModifier) => {
  const maxY = WINDOW_HEIGHT+(BASE_SIZE*1.1*sizeModifier)
  return maxY
}

export const delayGivenLevel = (level) => {
  const waitTime = BASE_DELAY*Math.pow(.9,level)*1000
  return waitTime
}

export const wait = waitTime => new Promise(function(resolve) {
  return setTimeout(resolve,waitTime)
})

export const updateTopScores = (name,score) => {
  let oldList = window.localStorage.getItem('topScores') || '[]'
  oldList = JSON.parse(oldList)
  let newList = [...oldList, {playerName: name, score: score}]
  newList = newList.sort((a,b) => (b.score-a.score)).slice(0,10)
  window.localStorage.setItem('topScores',JSON.stringify(newList))

  return newList
}
