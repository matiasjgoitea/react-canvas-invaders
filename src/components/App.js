import React from 'react'
import Canvas from './canvas'
import './app.css'

export default class CanvasInvaders extends React.Component {
  render() {
    return (
      <div>
        <h1> ¡Destroy all humans! </h1>
        <Canvas />
      </div>
    )
  }
}
