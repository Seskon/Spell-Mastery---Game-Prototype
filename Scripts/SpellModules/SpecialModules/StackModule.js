class StackModule extends Module
{
  static displayName = 'Stack'
  static description = ['The stack module increases its effectivness towards stackCounter that get hit several times']
  
  stackCounter = {}
  maxStackSize = 5
  
  onHit(spellEntity, hitEntity)
  {
    if(hitEntity.life.getCurrentValue() <= 0)
      return

    this.increaseCounter(spellEntity,hitEntity)
    this.addComponent(spellEntity, hitEntity)
    
    hitEntity.eventManager.subscribe((event) => {this.onTargetDeath(event)})
  }
  
  onTargetDeath(event)
  {
    if(event.triggerType == SpellTriggerTypes.onDeath)
      this.deleteStackOfTarget(event.caster.ID)
  }
  
  addComponent(spellEntity, hitEntity)
  {
    let stackComp = spellEntity.caster.getComponent('SPELLSTACK')
    
    if(stackComp == null)
    {
      stackComp = new SpellStackComponent()
      spellEntity.caster.addComponent(stackComp)
    }
      
    stackComp.addTarget(hitEntity, this)
  }
  
  addModifier(spellEntity, hitEntity)
  {
    spellEntity.attributeSheet.addModifier(new AttributeModifier(
        AttributeModifierTypes.additive,
        this.stackCounter[hitEntity.ID]*5,
        'spell_effectiveness',
        null, null))
  }
  
  increaseCounter(spellEntity, hitEntity)
  {
    let id = hitEntity.ID
    
    if(this.stackCounter[id] == null)
      this.stackCounter[id] = 0
    
    if(this.stackCounter[id] < this.maxStackSize)
    {
      this.stackCounter[id]++
      this.addModifier(spellEntity, hitEntity)
    }
  }
  
  deleteStackOfTarget(id)
  {
    delete this.stackCounter[id]
  }
  
  getCounter(id)
  {
    return this.stackCounter[id]
  }
}

console.log(StackModule.name+' loaded...')