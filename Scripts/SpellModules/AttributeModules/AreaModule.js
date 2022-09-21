class AreaModule extends Module
{
  static tag = 'area'
  static displayName = 'Area'
  static description = ['The area module increases the area of effect but also decreases the effectiveness of the spell']
  
  beforeCast(spellCore)
  {
    spellCore.attributeModifierCollector_temp.addAttributeModifier(
      new AttributeModifier(
        AttributeModifierTypes.additive,
        20,
        'spell_area',
        null,null
      )
    )
    
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

console.log(AreaModule.name+' loaded...')