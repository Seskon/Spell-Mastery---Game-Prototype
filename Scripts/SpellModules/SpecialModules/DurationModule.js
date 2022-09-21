//applys the spell over a certain duration at a reduced effectiveness (dmg over time)
class DurationModule extends Module
{
  static displayName = 'Duration'
  static description = ['The duration module lets the spell stay active for a short time after it reached its target position']
  
  
  modifierType = AttributeModifierTypes.additive
  value = 20
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
}

console.log(DurationModule.name+' loaded...')