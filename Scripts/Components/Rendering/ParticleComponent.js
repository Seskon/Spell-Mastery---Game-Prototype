class ParticleComponent extends Component
{
  ID = 'PARTICLE'
  constructor(direction, speed, color, size, lifeTime, tag)
  {
    super()
    this.direction = direction
    this.speed = speed
    this.color = color
    this.size = size
    this.timer = lifeTime
    this.tag = tag
  }
  
  setupComplete()
  {
    this.gameObject.addComponent(new RectangleRenderComponent(
      new Vector2(this.size), this.color))
  }
  
  enabledRun()
  {
    if(this.timer <= 0)
      this.gameObject.destroy()
    
    this.timer--
    
    this.gameObject.moveTo(new Vector2(
      this.gameObject.pos.x + this.direction.x * this.speed,
      this.gameObject.pos.y + this.direction.y * this.speed
    ))
  }
}

console.log(ParticleComponent.name+' loaded...')