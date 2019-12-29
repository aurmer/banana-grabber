import React from 'react'
import { connect } from 'react-redux'
import { playerNamed } from '../redux/actions'
import { ENTER_KEY } from '../constants'
import {Modal,Button} from 'react-bootstrap'

class PlayerWelcomeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { playerName: '' }
  }

  updateInput = playerName => {
    this.setState({ playerName })
  }
  updateInput_Event = e => this.updateInput(e.target.value)

  handleSubmit = () => {
    this.props.playerNamed(this.state.playerName)
    this.setState({ playerName: '' })
  }

  handleSubmitOnEnter = e => {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY) {
      this.handleSubmit()
    }
  }

  render = () =>
    (<Modal show={true} backdrop='static'>
      <Modal.Header>
        <Modal.Title>Welcome To Go, Go, Bananas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Enter your player name
        <input
          name='playerName'
          id='playerName'
          value={this.state.playerName}
          onChange={this.updateInput_Event}
          onKeyPress={this.handleSubmitOnEnter}
          autoComplete='off'
          style={{marginLeft:'20px'}}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>)
}

function mapStateToProps (state) {
  return { playerName: state.gameState.playerName }
}

// export default Todo
export default connect(
  mapStateToProps,
  { playerNamed }
)(PlayerWelcomeModal)
