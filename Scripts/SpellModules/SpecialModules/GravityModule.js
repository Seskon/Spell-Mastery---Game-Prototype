//pushes/pulls target
class GravityModule extends Module
{
  static displayName = 'Gravity'
  static description = ['The gravity module pulls all entities in its area towards the spells center']

  modifierType = AttributeModifierTypes.additive
  value = 4
  attributeId = 'spell_duration'
  
  onTurningPhysical(spellEntity){
    spellEntity.attributeSheet.addModifier(
      new AttributeModifier(
        this.modifierType,
        this.value,
        this.attributeId,
        null, null
      )
    )
    
    spellEntity.addComponent(new SpellGravityComponent(spellEntity.spellComp))
  }
  
  onTargetReached(spellComponent)
  {
    return true
  }
}

console.log(GravityModule.name+' loaded...')