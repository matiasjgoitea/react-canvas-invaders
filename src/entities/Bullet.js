export default class Bullet {
    constructor(args) {
      this.rotation = args.shooter.rotation
      this.yPosition = this.rotation === 0
        ? args.shooter.position.y - (args.shooter.radius / 2)
        : args.shooter.position.y + args.shooter.radius
      this.position = {
        x: args.shooter.position.x + (args.shooter.radius / 2),
        y: this.yPosition
      }
      this.radius = 2
    }
  
    destroy(){
      this.delete = true
    }
  
    render(state){
      const context = state.context

      if(this.rotation === 180) this.position.y += 10
      if(this.rotation === 0) this.position.y -= 10
  
      if ( this.position.y < 0 || this.position.y > state.screen.height ) {
        this.destroy()
      }
  
      context.save()
      context.translate(this.position.x, this.position.y)
      context.fillStyle = '#FFF'
      context.beginPath()
      context.arc(0, 0, 2, 0, 2 * Math.PI)
      context.closePath()
      context.fill()
      context.restore()
    }
  }
  