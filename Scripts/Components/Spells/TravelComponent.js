class TravelComponent extends Component
{
  ID = 'TRAVEL'
  range = 1
  
  constructor(marker, onTargetReached, travelSpeedAttribute)
  {
    super()
    this.marker = marker
    this.onTargetReached = onTargetReached
    
    this.travelSpeedAttribute = travelSpeedAttribute
  }
  
  setupComplete()
  {
    this.effectiveness = this.gameObject.attributeSheet.getAttribute('spell_effectiveness')
  }
  
  updateTravelSpeed()
  {
    this.travelSpeed = this.travelSpeedAttribute.getModifiedValue()/100
  }
  
  updateDirection()
  {
    this.direction = this.marker.pos.copy().subtract(this.gameObject.pos)
  }
  
  enabledRun()
  {
    this.travel()
  }
  
  travel()
  {
    this.updateTravelSpeed()
    this.updateDirection()
    this.move()
    this.checkIfTargetReached()
  }
  
  checkIfTargetReached()
  {
    if(this.direction.length() <= this.range)
    {
      this.enabled = false
      this.onTargetReached()
    }
  }
  
  move()
  {
    let speedVector = this.direction.copy().multiply(
      this.travelSpeed / this.direction.length())
   
    if(this.direction.length() != 0)
      this.gameObject.moveTo(speedVector.add(this.gameObject.pos))
  }
}

console.log(TravelComponent.name+' loaded...')