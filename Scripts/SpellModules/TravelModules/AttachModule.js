//the spell attaches to the target entity as long as it is active
class AttachModule extends Module
{
  static displayName = 'Attach'

  static description = ['The attach module lets spells attach for a short duration to the first target that gets hit']
  
  modifierType = AttributeModifierTypes.additive
  value = 2
  attributeId = 'spell_duration'
  targets = {}
  
  afterCast(spellEntity, castIndex)
  {
    spellEntity.attributeSheet.addModifier(
      new AttributeModifier(
        this.modifierType,
        this.value,
        this.attributeId,
        null,
        null
      )
    )
  }
  
  onTargetReached(spellComponent)
  {
    let spellEntity = spellComponent.gameObject
    
    if(this.targets[spellEntity.ID] != null)
      spellEntity.setNewTarget(this.targets[spellEntity.ID].centerPos)
    return true
  }
  
  onHit(spellEntity, hitEntity)
  {
    if(this.targets[spellEntity.ID] == null || this.targets[spellEntity.ID].scene == null)
      this.setTarget(spellEntity, hitEntity)
  }
  
  setTarget(spellEntity,hitEntity)
  {
    this.targets[spellEntity.ID] = hitEntity
    spellEntity.setNewTarget(hitEntity.centerPos)
  }
  
  onDestroy(spellEntity)
  {
    delete this.targets[spellEntity.ID]
  }
}

console.log(AttachModule.name+' loaded...')