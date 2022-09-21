//leeches life or mana based on the dmg dealt to the target
class LeechModule extends ElementalDamageModule
{
  static displayName = 'Leech'
  static description = ['The leech module damages on hit and heals the caster for a portion of the damage']

  modifierType = AttributeModifierTypes.additive
  value = 5
  attributeId = 'spell_duration'
  
  onTargetReached(spellComponent)
  {
    spellComponent.gameObject.attributeSheet.addModifier(
      new AttributeModifier(
        this.modifierType,
        this.value,
        this.attributeId,
        null,
        null
      )
    )
    
    return true
  }
  
  onHit(spellEntity, hitEntity)
  {
    super.onHit(spellEntity, hitEntity)
    
    if(this.damage > 0)
      spellEntity.caster.life.heal(this.damage/2,spellEntity)
  }
}

console.log(LeechModule.name+' loaded...')