class RangedCasterFollowBehaviour extends FollowBehaviourComponent
{
  cooldownTime = 2
  timer = 0
  castIndex = 0
  
  constructor(followDistance, speed, distance)
  {
    super(followDistance, speed)
    
    this.distance = distance
    
  }
  
  setupComplete()
  {
    super.setupComplete()
    
    this.addRangeModifier()
  }
  
  addRangeModifier()
  {
    let range = this.gameObject.attributeSheet.getAttribute('range')
    range.addModifier(new AttributeModifier(
      AttributeModifierTypes.additive,
      this.distance - range.getModifiedValue(),
      'range',
      null,null
    ))
  }
  
  enabledRun()
  {
    super.enabledRun()
    
    if(this.gameObject.deathTimer.died)
      return
    
    this.coolDown()
    this.follow = true
    this.findTarget()
    this.runCastBehaviour()
  }
  
  runCastBehaviour()
  {
    if(this.target == null)
      return

    this.updateDistanceToTarget()
    
    if(this.distanceToTarget <= this.distance)
      this.castSpell()
  }
  
  updateDistanceToTarget()
  {
    let pos = this.gameObject.pos.copy()
    let direction = pos.subtract(this.target.pos)
    this.distanceToTarget = direction.length()
  }
  
  findTarget()
  {
    if(this.target == null || this.target.scene == null)
      this.target = EntityFinder.findNearestTarget(this.gameObject, true)
  }
  
  coolDown()
  {
    if(this.timer >= 0)
      this.timer--
  }
  
  castSpell()
  {
    this.follow = false
    
    if(this.timer > 0)
      return
    
    let spell = this.gameObject.equipment.equippedCores[this.castIndex]
    
    if(spell == null)
      return this.increaseCastIndex()
    
    if(spell.requestCast(this.gameObject, this.target.pos.copy(), 0))
      this.setupNextCast()
  }
  
  setupNextCast()
  {
    this.timer = this.cooldownTime * _gameManager.fps
    this.increaseCastIndex()
  }
  
  increaseCastIndex()
  {
    this.castIndex++
    
    if(this.castIndex >= 9)
      this.castIndex = 0
  }
  
  copy()
  {
    return new RangedCasterFollowBehaviour(this.followDistance, this.speed, this.distance)
  }
}

console.log(RangedCasterFollowBehaviour.name + ' loaded...')