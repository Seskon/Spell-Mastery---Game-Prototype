class DrainModule extends Module
{
  static tag = 'drain'
  static displayName = 'Drain'

  static description = ['The drain module slowly damages the caster till he only has 1 life left. While draining the effectiveness of the spell is increased']
  
  afterCast(spellEntity)
  {
    spellEntity.overTime = true

    spellEntity.attributeSheet.addModifier(new AttributeModifier(
      AttributeModifierTypes.additive,
      300,
      'spell_effectiveness',
      null,null
    ))
  }
  
  onTargetReached(spellComponent)
  {
    spellComponent.gameObject.addComponent(new SpellDrainComponent(spellComponent))

    return true
  }
}

console.log(DrainModule.name+' loaded...')