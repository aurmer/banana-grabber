import React from 'react'
import { connect } from 'react-redux'
import { missedBanana, clickedBanana } from '../redux/actions'
import { BASE_SIZE,BASE_SPEED } from '../constants'
import { maxYGivenSize } from '../utilFunctions'

class Banana extends React.Component {

  bananaClicked = (node) => {
    this.props.clickedBanana(node.id)
  }

  clickedEvent = (e) => {
    this.bananaClicked(e.currentTarget)
  }

  initializeDrop = (node) => {
    if(node) {
      node.style.transform = `translate(${this.props.xPosition}px,${maxYGivenSize(this.props.sizeModifier)}px) rotate(${this.props.rotationOffset})`
    }
  }

  initializeDropEvent = (e) => this.initializeDrop(e.currentTarget)

  transitionEndEvent = (e) => {
    this.props.missedBanana(e.currentTarget.id)
  }

  componentDidMount = () => {
    setTimeout(()=>this.initializeDrop(document.getElementById(this.props.id)),50)
  }

  render = () => {
    const bananaContainerStyles = {
      height: `${BASE_SIZE*this.props.sizeModifier}px`,
      width: `${BASE_SIZE*this.props.sizeModifier}px`,
      transitionDuration: `${Math.floor(BASE_SPEED/this.props.speedModifier)}s`,
      transform: `translate(${this.props.xPosition}px,${-BASE_SIZE*this.props.sizeModifier}px) rotate(${this.props.rotationOffset})`
    }

    const bananaImageStyles = {
      animationDuration: `${Math.floor(BASE_SPEED/this.props.speedModifier)}s`
    }

    return (<>
      <div id={this.props.id}
        className="bananaContainer"
        style={bananaContainerStyles}
        onMouseDown={this.clickedEvent} onTransitionEnd={this.transitionEndEvent}>
        <div className="bananaImage" style={bananaImageStyles} />
      </div>
    </>)
  }

}

function mapStateToProps (state) {
  return {}
}

// export default Todo
export default connect(
  mapStateToProps,
  { missedBanana, clickedBanana }
)(Banana)
