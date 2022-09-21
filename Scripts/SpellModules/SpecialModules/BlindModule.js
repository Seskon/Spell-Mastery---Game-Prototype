class BlindModule extends Module
{
  static displayName = 'Blind'

  static description = ['The blind module allows the the spells to roll for a blinding hit. Blinded entities have a reduced range for a short duration']

  duration = 4
  
  modifierType = AttributeModifierTypes.additive
  attributeId = 'duration'
  
  onHit(spellEntity, hitEntity)
  {
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    let chanceToBlind = spellEntity.caster.attributeSheet.getAttribute('chance_to_blind')/100
    
    let applyBlind = Math.random() < chanceToBlind
    
    if(true)
      hitEntity.addComponent(new SpellBlindComponent(spellEntity.spellComp, this.duration*effectiveness), true)
  }
}

console.log(BlindModule.name+' loaded...')