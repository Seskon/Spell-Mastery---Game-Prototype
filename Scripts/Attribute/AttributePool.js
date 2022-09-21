class AttributePool
{
  constructor(baseID, maximum, attributeSheet, progressBar, onEmpty)
  {
    this.baseID = baseID
    this.maximum = maximum
    this.attributeSheet = attributeSheet
    this.progressBar = progressBar
    this.onEmpty = onEmpty
    this.gameObject = progressBar.gameObject

    this.setupMaximumAttribute()
    this.setupRservedAttribute()
    this.setupRisingText()
  }
  
  setupRisingText()
  {
    let offset = new Vector2(0, -12)
    this.risingDamageText = new RisingTextComponent(offset,'rgba(255,0,0,0)', '-')
    this.risingHealText = new RisingTextComponent(offset, 'rgba(0,255,0,0)', '+')
  
    this.gameObject.addComponent(this.risingDamageText)
    this.gameObject.addComponent(this.risingHealText)
  }
  
  setupMaximumAttribute()
  {
    this.maxAttribute = new Attribute(
      this.baseID + "_maximum", false, this.maximum)
      
    this.attributeSheet.addAttribute(this.maxAttribute)
    this.maxAttribute.getEventManager().subscribe(
      () => {this.onChange()})
    
    this.currentPool = this.maximum
    this.progressBar.setMaxValue(this.maximum)
    this.progressBar.setCurrentValue(this.currentPool)
  }
  
  getCurrentValue()
  {
    return this.currentPool
  }
  
  setupRservedAttribute()
  {
    this.reservedAttribute = new Attribute(
      this.baseID + "_reserved", false, 100)
      
    this.attributeSheet.addAttribute(this.reservedAttribute)
    this.reservedAttribute.getEventManager().subscribe(
      () => {this.onChange()})
  }
  
  damage(value, source)
  {
    this.currentPool -= value
    this.currentPool = Math.max(this.currentPool,0)
    this.progressBar.setCurrentValue(this.currentPool)

    this.risingDamageText.addValue(value)
    
    this.gameObject.eventManager.call({
      type: ExecutionTypes.onTrigger,
      triggerType: SpellTriggerTypes.onDamageTaken,
      targetPos: source.caster.centerPos,
      caster: this.gameObject
    })

    if(this.currentPool <= 0)
      this.onEmpty(source)
  }
  
  getReservedValue()
  {
    return Math.min(Math.max(this.reservedAttribute.getModifiedValue(),0),100)/100
  }
  
  heal(value)
  {
    this.currentPool = this.currentPool + value
    
    this.currentPool = Math.min(this.currentPool, this.maxAttribute.getModifiedValue() * this.getReservedValue())
    
    this.risingHealText.addValue(value)
    
   this.progressBar.setCurrentValue(this.currentPool)
  }
  
  onChange()
  {
    let maxValue = this.maxAttribute.getModifiedValue()
   
    this.currentPool = Math.min(this.currentPool, maxValue * this.getReservedValue())
    this.progressBar.setCurrentValue(this.currentPool)
    this.progressBar.setMaxValue(maxValue)
  }
}

console.log(AttributePool.name+' loaded...')