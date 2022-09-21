class SpellChannelComponent extends Component
{
  ID = 'SPELLCHANNEL'
  
  addedModifier = new List()
  numStages = 5
  intervall = 1 * _gameManager.fps
  currentStage = 0
  
  constructor(spellCore,targetPosition, castIndex)
  {
    super()
    
    this.currentTimer = 0
    this.spellCore = spellCore
    this.castIndex = castIndex
    this.targetPosition = targetPosition
  }
  
  setupComplete()
  {
    this.casterPos = this.gameObject.pos.copy()
  }
  
  enabledRun()
  {
    if(this.casterPositionChanged())
      return this.remove()
    
    this.runCastTimer()
    this.drawIndicator()
  }
  
  runCastTimer()
  {
    this.currentTimer--
    
    if(this.currentTimer <= 0)
      this.cast()
  }
  
  cast()
  {
    this.setupNextIntervall()
    
    this.spellCore.requestCast(this.gameObject, this.targetPosition, this.castIndex)
    
    if(this.currentStage == this.numStages)
      this.remove()
  }
  
  setupNextIntervall()
  {
    this.currentStage++
    this.currentTimer = this.intervall
    this.addEffectivenessModifier()
  }
  
  addEffectivenessModifier()
  {
    let mod = new AttributeModifier(
      AttributeModifierTypes.additive,
      20,
      'spell_effectiveness',
      null,
      null
    )
    
    this.addedModifier.add(mod)
    this.spellCore.attributeModifierCollector_temp.addAttributeModifier(mod)
  }
  
  remove()
  {
    this.gameObject.canCast = true
    this.spellCore.isInUse = false
    
    this.removeModifier()
    this.gameObject.removeComponent(this)
  }
  
  removeModifier()
  {
    for(let mod of this.addedModifier.items)
      this.spellCore.attributeModifierCollector_temp.removeAttributeModifier(mod)
  }
  
  casterPositionChanged()
  {
    return !this.casterPos.equals(this.gameObject.pos)
  }
  
  drawIndicator()
  {
    let dim = this.gameObject.getDimension().copy().divide(2)
    let start = dim.add(this.gameObject.screenPos)
    
    let end = this.targetPosition.copy()
    _gameManager.sceneManager.worldToScreenPos(end)
    
    Paint.line(start, end, 'orange', 2, [])
  }
}

console.log(SpellChannelComponent.name+' loaded...')