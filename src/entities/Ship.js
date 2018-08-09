import Bullet from './Bullet'

export default class Ship {
  constructor(args) {
    this.position = args.position
    this.rotation = 0;
    this.radius = 32;
    this.create = args.create;
    this.onDie = args.onDie;
    this.lastShot = 0;
  }

  destroy() {
    this.delete = true
    this.onDie()
  }

  move(dir) {
    dir === 'LEFT'
      ? this.position.x -= 10
      : this.position.x += 10
  }

  shoot() {
    if (Date.now() - this.lastShot > 500) {
      const bullet = new Bullet({ shooter: this })
      this.create(bullet, 'bullets')
      this.lastShot = Date.now();
    }
  }

  render(state) {
    const context = state.context

    if(state.keys.LEFT) this.move('LEFT')
    if(state.keys.RIGHT) this.move('RIGHT')
    if(state.keys.SPACE) this.shoot()

    if(this.position.x > (state.screen.width - (this.radius * 2))) this.position.x = (state.screen.width - (this.radius * 2));
    else if(this.position.x < 0) this.position.x = 0;

    context.save()
    context.translate(this.position.x, this.position.y)
    context.fillStyle = '#FFF'
    context.beginPath()
    context.moveTo(16, 0)
    context.lineTo(32, 32)
    context.lineTo(0, 32)
    context.closePath()
    context.fill()
    context.restore()
  }
}
