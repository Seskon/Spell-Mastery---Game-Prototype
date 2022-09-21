class SpellOrbitComponent extends Component
{
  currentAngle = 0
  
  constructor(marker, radius, speed)
  {
    super()
    
    this.marker = marker
    this.radius = radius
    this.speed = speed
  }
  
  enabledRun()
  {
    this.moveInCircle()
  }
  
  moveInCircle()
  {
    let radius = this.radius.getModifiedValue()
    this.currentAngle += Math.acos(1-Math.pow(this.speed/radius,2)/2)
    
    let nextPos = new Vector2(
      radius*Math.cos(this.currentAngle),
      radius*Math.sin(this.currentAngle)
    )
    
    nextPos.add(this.marker.pos)
    
    this.gameObject.moveTo(nextPos)
  }
}

console.log(SpellOrbitComponent.name+' loaded...')