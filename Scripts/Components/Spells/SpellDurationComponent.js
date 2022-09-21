class SpellDurationComponent extends Component
{
  ID = 'DURATION'
  
  constructor(spellComponent, duration, isReducingEffectiveness = true)
  {
    super()
    
    this.spellComponent = spellComponent
    this.duration = duration * _gameManager.fps
    this.timer = this.duration
    
    if(isReducingEffectiveness)
      spellComponent.gameObject.overTime = true
  }
  
  reduceEffectiveness()
  {
    let attributeSheet = this.spellComponent.gameObject.attributeSheet
    
    let damage = attributeSheet.getAttribute('spell_damage').getModifiedValue()
    
    attributeSheet.addModifier(
        new AttributeModifier(
          AttributeModifierTypes.additive,
          -(damage - damage/this.duration),
          'spell_damage',
          null, null
        )
      )
  }
  
  setupComplete()
  {
    this.bar = new ProgressBarComponent(new Vector2(0,5), new Vector2(20,1), 'gray', 'white', true)
    
    this.bar.setMaxValue(this.duration)
    this.bar.setCurrentValue(0)
    
    this.gameObject.addComponent(this.bar)
  }
  
  enabledRun()
  {
    this.runTimer()
  }
  
  runTimer()
  {
    this.timer--
    this.bar.setCurrentValue(this.timer)
    
    if(this.timer <= 0)
      this.onDurationOver()
  }
  
  onDurationOver()
  {
    this.gameObject.removeComponent(this.bar)
    this.spellComponent.destroy()
  }
}

console.log(SpellDurationComponent.name+' loaded...')