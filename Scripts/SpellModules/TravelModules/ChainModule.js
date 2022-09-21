class ChainModule extends Module
{
  static displayName = 'Chain'

  static description = ['The chain module allows the spell to charge at other targets after a succesfull hit at a reduced effectiveness']
  
  range = 50
  maxChainCount = 3
  currentChainCount = {}
  
  afterCast(spellEntity, castIndex)
  {
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()
    
    spellEntity.attributeSheet.addModifier(new AttributeModifier(
      AttributeModifierTypes.additive,
      -(effectiveness - effectiveness/this.maxChainCount),
      'spell_effectiveness',
      null,null
    ))
  }
  
  onTargetReached(spellComponent)
  {
    let spellEntity = spellComponent.gameObject
    this.increaseCounter(spellEntity.ID)
    
    if(this.currentChainCount[spellEntity.ID] == this.maxChainCount)
      spellComponent.destroy()
    
    return true
  }
  
  onHitComplete(spellEntity)
  {
    if(spellEntity.spellComp.targetReached)
      spellEntity.spellComp.destroy()
  }
  
  increaseCounter(id)
  {
    if(this.currentChainCount[id] == null)
      this.currentChainCount[id] = 0
      
    this.currentChainCount[id]++
  }
  
  onHit(spellEntity, hitEntity)
  {
    if(spellEntity.caster == hitEntity)
      return

    let nextTarget = this.findNextTarget(spellEntity)
    
    if(nextTarget == null)
      return spellEntity.spellComp.destroy()
   
    this.lastTarget = nextTarget
    
    spellEntity.setNewTarget(nextTarget.centerPos)
    spellEntity.spellComp.isPhysical = false
    
    return true
  }
  
  findNextTarget(spellEntity)
  {
    let entities = Object.values(_gameManager.runManager.activeEntities)
    
    for(let entity of entities)
      if(entity != spellEntity && entity != spellEntity.caster && entity != this.lastTarget && entity.pos.copy().subtract(spellEntity.pos).length() < this.range)
          return entity

    return null
  }
  
  onDestroy(spellEntity)
  {
    delete this.currentChainCount[spellEntity.ID]
  }
}

console.log(ChainModule.name+' loaded...')