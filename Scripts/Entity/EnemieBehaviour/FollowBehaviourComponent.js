class FollowBehaviourComponent extends Component
{
  follow = true
  
  constructor(followDistance, speed)
  {
    super()
    
    this.followDistance = followDistance
    this.speed = speed
  }
  
  setupComplete()
  {
    this.moveSpeedAttribute = this.gameObject.attributeSheet.getAttribute('move_speed')
  }
  
  findNewTarget()
  {
    if(this.target == null)
      this.target = EntityFinder.findNearestTarget(this.gameObject, true)
  }
  
  updateDirection()
  {
    this.direction = this.target.pos.copy().subtract(this.gameObject.pos)
  }
  
  runFollowBehaviour()
  {
    if(this.gameObject.deathTimer.died)
      return
    
    this.findNewTarget()
    this.updateDirection()
    
    if(this.direction.length() <= this.followDistance)
      this.followTarget()
    else
      this.target = null
  }
  
  enabledRun()
  {
    this.runFollowBehaviour()
  }
  
  followTarget()
  {
    if(!this.follow)
      return
    
    let nextPos = this.gameObject.pos.normalizedDirection(this.target.pos)
    nextPos.multiply(this.moveSpeedAttribute.getModifiedValue()/100 * this.speed * _gameManager.gameSpeed)
    nextPos.add(this.gameObject.pos)
    
    this.gameObject.moveTo(nextPos)
  }
  
  copy()
  {
    return new FollowBehaviourComponent(this.followDistance, this.speed)
  }
}

console.log(FollowBehaviourComponent.name + ' loaded...')