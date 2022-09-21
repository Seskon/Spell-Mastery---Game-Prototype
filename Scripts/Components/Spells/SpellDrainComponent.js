class SpellDrainComponent extends Component
{
  drainValue = 0.05
  minLife = 1
  addedEffectiveness = 0
  maxEffectiveness = 500
  
  constructor(spellComponent)
  {
    super()
    
    this.spellComponent = spellComponent
    this.caster = spellComponent.caster
  }
  
  enabledRun()
  {
    if(this.caster.life.getCurrentValue() > this.minLife)
      this.drain()
    else
      this.spellComponent.destroy()
      
    this.drawConnection()
  }
  
  drain()
  {
    let damage = this.gameObject.attributeSheet.getAttribute('spell_damage').getModifiedValue()
   
    damage = damage/(this.gameObject.spellCore.coolDownComp.calculateCooldownTime())
      
    this.caster.life.damage(damage, this.gameObject)
  }
  
  drawConnection()
  {
    let from = this.gameObject.screenPos
    let to = this.caster.getDimension().copy().divide(2)
    to.add(this.caster.screenPos)
    
    Paint.line(from, to, 'red', 1, [])
  }
}

console.log(SpellDrainComponent.name+' loaded...')