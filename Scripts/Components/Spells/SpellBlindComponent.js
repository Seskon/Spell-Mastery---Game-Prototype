class SpellBlindComponent extends SpellDurationComponent
{
  ID = 'SPELL_BLIND'
  
  constructor(spellComponent, duration)
  {
    super(spellComponent, duration, false)
  }

  reduceRange()
  {
    this.modifier = new AttributeModifier(
      AttributeModifierTypes.additive,
      -this.range.getModifiedValue()/2,
      'range',
      null, null
    )
    
    this.attributeSheet.addModifier(this.modifier)
  }

  setupComplete()
  {
   super.setupComplete()
    
    this.attributeSheet = this.gameObject.attributeSheet
    this.range = this.attributeSheet.getAttribute('range')
    
    this.reduceRange()
  }
  
  onDurationOver()
  {
    super.onDurationOver()
    this.attributeSheet.removeModifier(this.modifier)
    this.gameObject.removeComponent(this)
  }
  
  enabledRun()
  {
    
    let dim = this.gameObject.getDimension().copy().divide(2)
    let center = dim.add(this.gameObject.screenPos)
    
    Paint.filledCircle(dim, this.range.getModifiedValue(), 0, Math.PI*2, '#00000033')
    
    super.enabledRun()
  }
}

console.log(SpellBlindComponent.name+' loaded...')