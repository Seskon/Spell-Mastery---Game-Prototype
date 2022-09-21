class ChargeModule extends Module
{
  static tag = "charge"
  static displayName = 'Charge'

  static description = ['The charge module charges up the spell while the caster is not moving. The longer the caster charges up the spell the higher its effectiveness']
  
  modifierType = AttributeModifierTypes.multiply
  attributeId = 'spell_effectiveness'
  
  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    spellCore.isInUse = true
    
    caster.addComponent(new SpellChargeComponent(spellCore, targetPosition, castIndex))
    
    return true
  }
}

console.log(ChargeModule.name+' loaded...')