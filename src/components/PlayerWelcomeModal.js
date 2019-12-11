import React from "react"
import { connect } from "react-redux"
import { playerNamed } from "../redux/actions"
import { ENTER_KEY } from "../constants"

class PlayerWelcomeModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = { pname: "" }
  }

  updateInput = pname => {
    this.setState({pname})
  }

  handleSubmit = () => {
    this.props.playerNamed(this.state.pname)
    this.setState({pname:""})
  }

  render() {
    return (<div className="newPlayerModal">
      <h1>Welcome To<br/>Go, Go, Bananas</h1>
      <h3>Enter your player name</h3>
      <input
        name="playerName"
        id="playerName"
        value={this.state.pname}
        onChange={e => this.updateInput(e.target.value)}
        onKeyPress={e => (((e.which || e.keyCode) === ENTER_KEY) ? this.handleSubmit() : null)}
      />
      <button
        onClick={this.handleSubmit}
      >Submit</button>
    </div>)
  }
}

let mapStateToProps = state => ({pname:state.gameState.pname})

// export default Todo;
export default connect(
  mapStateToProps,
  { playerNamed }
)(PlayerWelcomeModal)
