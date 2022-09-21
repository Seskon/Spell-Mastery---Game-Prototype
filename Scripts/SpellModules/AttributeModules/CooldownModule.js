class CooldownModule extends Module
{
  static tag = "cooldown"
  static displayName = 'Cooldown'
  static description = ['The cooldown module reduces the cooldown time of the core but it also reduces the spell effectiveness of the spells']
  
  onEquip(spellCore)
  {
    this.mod = new AttributeModifier(
        AttributeModifierTypes.additive,
        50,
        'spell_cooldown_time',
        null,null
      )
      
    spellCore.coolDownComp.addModifier(
      this.mod
    )
  }
  
  onRemove(moduleManager)
  {
    moduleManager.spellCore.coolDownComp.removeModifier(this.mod)
  }
  
  beforeCast(spellCore)
  {
    spellCore.attributeModifierCollector_temp.addAttributeModifier(
      new AttributeModifier(
        AttributeModifierTypes.additive,
        -20,
        'spell_effectiveness',
        null, null
      )
    )
  }
}

console.log(CooldownModule.name+' loaded...')