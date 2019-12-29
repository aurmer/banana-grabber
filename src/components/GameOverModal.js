import React from 'react'
import { connect } from 'react-redux'
import { replay } from '../redux/actions'
import {Modal,Button} from 'react-bootstrap'
import { updateTopScores } from '../utilFunctions'

function renderTopScore(highScore,idx) {
  return (
    <li key={idx}>{highScore.playerName} - {highScore.score}</li>
  )
}

function GameOverModal (props) {

  let scoreList = updateTopScores(props.playerName,props.score)
  scoreList = scoreList.map(renderTopScore)

  return (<Modal show={true} backdrop='static'>
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Top Scores</h2>
        <ol>
          {scoreList}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.replay}>
          Replay
        </Button>
      </Modal.Footer>
    </Modal>)
}

function mapStateToProps (state) {
  return {
    playerName: state.gameState.playerName,
    score: state.gameState.score
  }
}

// export default Todo
export default connect(
  mapStateToProps,
  { replay }
)(GameOverModal)
