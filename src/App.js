import React from 'react'
import PlayerWelcomeModal from './components/PlayerWelcomeModal'
import GameOverModal from './components/GameOverModal'
import LevelUpModal from './components/LevelUpModal'
import GameDisplay from './components/GameDisplay'
import './App.css'
import { connect } from 'react-redux'

function App (props) {
  let conditional_nodes = []
  if(props.gameStarted === false) {
    conditional_nodes.push(<PlayerWelcomeModal key="welcome" />)
  }
  if(props.notifications === true) {
    conditional_nodes.push(<></>)
  }
  if(props.gameOver === true) {
    conditional_nodes.push(<GameOverModal key="gameover" />)
  }
  if(props.nextLevelOverlay === true) {
    conditional_nodes.push(<LevelUpModal key="levelup" />)
  }

  return (<>
      {conditional_nodes}
      <GameDisplay />
    </>
  )
}

function mapStateToProps(state) {
  return {
    gameStarted: state.gameState.gameStarted,
    notifications: false,
    gameOver: state.gameState.gameOver,
    nextLevelOverlay: state.gameState.nextLevelOverlay
  }
}

// export default Todo
export default connect(
  mapStateToProps
)(App)
