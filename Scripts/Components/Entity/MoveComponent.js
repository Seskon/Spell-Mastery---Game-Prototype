class MoveComponent extends Component
{
  ID = "MOVE"
  
  constructor(direction)
  {
    super()
    this.direction = direction
  }
  
  setupComplete()
  {
    this.speedAttribute = this.gameObject.attributeSheet.getAttribute('move_speed')
  }
  
  enabledRun()
  {
    if(this.gameObject.deathTimer.died)
      return
    
    let speed = this.speedAttribute.getModifiedValue()/100
    let speedVector = this.direction.copy()
    speedVector.multiply(-speed)
    
    this.gameObject.moveTo(speedVector.add(this.gameObject.pos))
  }
}

console.log(MoveComponent.name+' loaded...')