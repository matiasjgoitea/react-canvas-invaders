import Bullet from '../Bullet'

export default class Enemy {
  constructor(args) {
    this.position = args.position
    this.rotation = 180
    this.radius = 32
    this.create = args.create
  }

  destroy() {
    this.delete = true
  }

  shoot() {
    const bullet = new Bullet({ shooter: this })
    this.create(bullet, 'bullets')
  }

  render(state) {
    const context = state.context
    context.save()
    context.translate(this.position.x, this.position.y)
    context.fillStyle = '#FFF'
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(32, 0)
    context.lineTo(32, 32)
    context.lineTo(0, 32)
    context.closePath()
    context.fill()
    context.restore()
  }
}
