class SpellChargeComponent extends Component
{
  ID = 'SPELLCHARGE'
  
  chargeTime = 1 * _gameManager.fps
  area = 100
  
  constructor(spellCore, targetPosition, castIndex)
  {
    super()
    
    this.castIndex = castIndex
    this.spellCore = spellCore
    this.targetPosition = targetPosition
    this.timer = this.chargeTime
  }
  
  setupComplete()
  {
    this.gameObject.canCast = false
    this.casterPos = this.gameObject.pos.copy()
  }
  
  enabledRun()
  {
    if(this.casterPositionChanged())
      return this.castSpell()
    
    this.runSpellTimer()
    this.drawChargeIndicator()
  }
  
  runSpellTimer()
  {
    this.timer--
    
    if(this.timer <= 0)
      this.castSpell()
  }
  
  drawChargeIndicator()
  {
    let progress = Math.max(this.timer/this.chargeTime, 0)
    
    let pos = this.targetPosition.copy()
    _gameManager.sceneManager.worldToScreenPos(pos)
    
    this.drawCircleIndicator(pos, progress)
    this.drawLineIndicator(pos, progress)
  }
  
  drawLineIndicator(pos, progress)
  {
    let from = this.gameObject.centerPos.copy()
    _gameManager.sceneManager.worldToScreenPos(from)
    
    Paint.line(from, pos, 'orange', 1)
  }
  
  drawCircleIndicator(pos, progress)
  {
    Paint.circelOutline(pos, this.area * progress, 0, Math.PI*2, 'orange')
  }
  
  castSpell()
  {
    this.numCharges = Math.floor((this.chargeTime-this.timer)/_gameManager.fps)
    
    this.spellCore.isInUse = false
    this.gameObject.canCast = true

    this.addEffectivenessModifier()

    this.spellCore.requestCast(this.gameObject, this.targetPosition, this.castIndex)
    
    this.gameObject.removeComponent(this)
  }
  
  addEffectivenessModifier()
  {
    this.spellCore.attributeModifierCollector_temp.addAttributeModifier(new AttributeModifier(
      AttributeModifierTypes.additive,
      this.numCharges*200,
      'spell_effectiveness',
      null,
      null)
    )
  }
  
  casterPositionChanged()
  {
    return !this.casterPos.equals(this.gameObject.pos)
  }
}

console.log(SpellChargeComponent.name+' loaded...')