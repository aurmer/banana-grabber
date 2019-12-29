import React from 'react'
import { connect } from 'react-redux'
import {Row,Col,Toast} from 'react-bootstrap'
import Banana from './Banana.js'
import { fetchedBanana, createdBanana } from '../redux/actions'
import { wait } from '../utilFunctions'


class GameDisplay extends React.Component {
  // constructor (props) {
  //   super(props)
  //
  // }

  componentDidMount = () => {
    this.setState({endlessBananas: this.endlessBananas()})
    this.setState({nextBanana: this.nextBanana()})
  }

  nextBanana = () => {
    const waitTime = (this.props.dropDelay)*1000

    wait(waitTime)
      .then(() => {
        this.props.fetchedBanana()
      })
      .then(this.nextBanana)
  }

  endlessBananas = () => new Promise(resolve => {
    const waitTime = (.1)*1000

    wait(waitTime)
      .then(()=>{
        if(!this.props.gameStarted || this.props.gameOver) {
          this.props.createdBanana()
        }
      })
      .then(this.endlessBananas)
    }
  )



  bananaMapper = (banana) => {
    return (<Banana
      {...banana}
      key={banana.id}
      />)
  }

  render = () => {

    const {playedBananas} = this.props
    const playedBananaComponent = Object.values(playedBananas).map(this.bananaMapper)

    const statBoardStyles = {
      position: 'absolute',
      right: '20px',
      bottom: '20px',
      margin: '0'
    }

    const showStatBoard = this.props.gameStarted

    const statBoard = (
      <Toast style={statBoardStyles} show={showStatBoard}>
        <Toast.Body style={{userSelect: 'none'}}>
          Go, Go, Bananas <br />
          level: {this.props.level} <br />
          score: {this.props.score} <br />
          lives left: {this.props.lives}
        </Toast.Body>
      </Toast>
    )

    return (
      <Row noGutters='true'>
          <Col>
            <div style={{height:'100vh',backgroundColor:'rgba(0,0,0,0)',zIndex:'10',position:'relative',overflow:'hidden'}}>
              {statBoard}
              {playedBananaComponent}
            </div>
          </Col>
        </Row>)
    }
}

function mapStateToProps (state) {
  return {
    score: state.gameState.score,
    lives: state.gameState.lives,
    playedBananas: state.gameState.playedBananas,
    level: state.gameState.level,
    dropDelay: state.gameState.dropDelay,
    gameStarted: state.gameState.gameStarted,
    gameOver: state.gameState.gameOver,
    bananasLeft: Object.keys(state.gameState.queuedBananas).length,
    bananasFetched: Object.keys(state.gameState.playedBananas).length
  }
}

// export default Todo
export default connect(
  mapStateToProps,
  { fetchedBanana, createdBanana }
)(GameDisplay)
