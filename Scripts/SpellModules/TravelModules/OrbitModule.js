//spell orbits around target(location)
class OrbitModule extends Module
{
  static displayName = 'Orbit'

  static description = ['The orbit module allows the the spell to circle around the target position for a short duration']

  modifierType = AttributeModifierTypes.additive
  value = 2
  attributeId = 'spell_duration'
  
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
    
    spellEntity.addComponent(new SpellOrbitComponent(
      spellEntity.marker,
      spellComponent.area,
      spellEntity.travelComp.travelSpeed
    ))
    
    return true
  }
}

console.log(OrbitModule.name+' loaded...')