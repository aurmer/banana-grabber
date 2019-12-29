import React from 'react'
import { connect } from 'react-redux'
import { startLevel } from '../redux/actions'
import {Modal} from 'react-bootstrap'

class LevelUpModal extends React.Component {

  componentDidMount = () => {
  }

  componentDidUpdate = () => {
  }

  nextCount = () => {
    const oneLess = document.getElementById('countdown').innerHTML - 1
    if(oneLess === 0) {
      this.props.startLevel()
    } else {
      document.getElementById('countdown').innerHTML = oneLess
    }

  }

  render = () => {
    return (<Modal show={true} backdrop={false} animation={false} centered style={{border: 'none',textAlign: 'center'}} size='sm'>
        <Modal.Body>
          <h2>Level {this.props.level}</h2>
          <h1 id='countdown' className='level-number' onAnimationIteration={this.nextCount}>
            3
          </h1>
        </Modal.Body>
      </Modal>)
  }
}

function mapStateToProps (state) {
  return {
    level: state.gameState.level
  }
}

// export default Todo
export default connect(
  mapStateToProps,
  { startLevel }
)(LevelUpModal)
