import React from 'react'
import Ship from '../../entities/Ship'
import Enemy from '../../entities/enemies/Common'

const KEY = {
  37: 'LEFT',
  39: 'RIGHT',
  32: 'SPACE'
}

export default class canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: null,
      screen: {
        width: 720,
        height: 720
      },
      keys : {
        LEFT: 0,
        RIGHT: 0,
        SPACE: 0
      }
    }
    this.canvasRef = React.createRef()
    this.ship = []
    this.enemies = []
    this.bullets = []
  }
  componentDidMount() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false))
    window.addEventListener('keydown', this.handleKeys.bind(this, true))
    
    const context = this.canvasRef.current.getContext('2d')
    this.setState({ context })
    this.startGame()
    requestAnimationFrame(() => { this.update() })
  }
  UNSAFE_componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeys)
    window.removeEventListener('keydown', this.handleKeys)
  }
  handleKeys(value, e) {
    const { keys } = this.state
    keys[KEY[e.keyCode]] = value
    this.setState({
      keys
    })
  }
  update() {
    const { context, screen: { width, height } } = this.state

    context.save()
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    this.checkCollisionsWith(this.enemies, this.bullets);
    this.checkCollisionsWith(this.ship, this.bullets);

    this.updateEntities(this.bullets, 'bullets')
    this.updateEntities(this.enemies, 'enemies')
    this.updateEntities(this.ship, 'ship')

    context.restore()

    requestAnimationFrame(() => { this.update() })
  }
  createEntity(item, group) {
    this[group].push(item)
  }
  updateEntities(items, group) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].delete) {
        this[group].splice(i, 1);
      }else{
        items[i].render(this.state);
      }
    }
  }
  checkCollisionsWith(arrA, arrB) {
    for(let a = 0; a < arrA.length; a++) {
      for(let b = 0; b < arrB.length; b++) {
        if(this.checkCollision(arrA[a],arrB[b])) {
          arrA[a].destroy()
          arrB[b].destroy()
        }
      }
    }
  }
  checkCollision(itemA, itemB) {
    const { position: objA, radius: radiusA } = itemA
    const { position: objB, radius: radiusB } = itemB
    if (objA.x < (objB.x + radiusB) && (objA.x + radiusA) > objB.x &&
      objA.y < (objB.y + radiusB) && (objA.y + radiusA) > objB.y)
    {
      return true
    }
    return false
  }
  startGame() {
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2 - 16,
        y: 668
      },
      create: this.createEntity.bind(this),
      onDie: this.gameOver.bind(this)
    })

    this.createEntity(ship, 'ship')

    let enemy = new Enemy({
      position: {
        x: this.state.screen.width / 2 - 16,
        y: 20
      },
      create: this.createEntity.bind(this)
    })

    this.createEntity(enemy, 'enemies')

    this.setState({
      inGame: true,
      currentScore: 0
    })
  }
  gameOver() {
    this.setState({
      inGame: false
    })
  }
  render() {
    const { screen: { width, height } } = this.state
    return (
      <div>
        <canvas ref={this.canvasRef} width={width} height={height} />
      </div>
    )
  }
}
