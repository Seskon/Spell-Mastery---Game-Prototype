class TemporaryAttributeModule extends Module
{
  modifier = {}
  hitEntities = {}
  
  constructor(value, attributeId)
  {
    super()
    
    this.value = value
    this.attributeId = attributeId
  }
  
  afterCast(spellEntity)
  {
    this.applyModifierToEntity(spellEntity, spellEntity, true)
  }
  
  onHit(spellEntity, hitEntity){
    this.applyModifierToEntity(spellEntity, hitEntity, false)
    
    this.hitEntities[spellEntity.ID][hitEntity.ID] = true
  }
  
  beforeHit(spellEntity)
  {
    this.hitEntities[spellEntity.ID] = {}
    this.hitEntities[spellEntity.ID][spellEntity.ID] = true
  }
  
  onHitComplete(spellEntity)
  {
    if(this.modifier[spellEntity.ID] == null)
      return
    
    let entries = Object.entries(this.modifier[spellEntity.ID])
    
    for(let [key, value] of entries)
      if(this.hitEntities[spellEntity.ID][value[1].ID] == null)
      {
        value[1].attributeSheet.removeModifier(value[0])
        delete this.modifier[spellEntity.ID][key]
      }
  }
  
  applyModifierToEntity(source, target, onSpell)
  {
    if(this.modifier[source.ID] == null)
      this.modifier[source.ID] = {}
    
    if(this.modifier[source.ID][target.ID] != null)
      return
    
    let effectiveness = source.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    let mod = new AttributeModifier(
      AttributeModifierTypes.additive,
      this.value * effectiveness,
      (onSpell?'spell_':'') + this.attributeId,
      null, null
    )
    
    target.attributeSheet.addModifier(mod)
    this.modifier[source.ID][target.ID] = [mod, target]
  }
  
  onRemove(moduleManager)
  {
    for(let modifierObj of Object.values(this.modifier))
      for(let value of Object.values(modifierObj))
        value[1].attributeSheet.removeModifier(value[0])
  }
  
  onDestroy(spellEntity)
  {
    let entries = Object.entries(this.modifier[spellEntity.ID])
    
    for(let [key, value] of entries)
      value[1].attributeSheet.removeModifier(value[0])
      
    delete this.hitEntities[spellEntity.ID]
    delete this.modifier[spellEntity.ID]
  }
}