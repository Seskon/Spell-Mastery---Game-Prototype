class ElementalDamageModule extends Module
{
  static tag = "damage"
  static displayName = 'Damage'
  static description = ['The damage module adds elemental damage to the spell depending on the element of the core']
  
  afterHit(spellEntity, hitEntity)
  {
    this.dealDamage(spellEntity, hitEntity)
  }
  
  dealDamage(spellEntity, hitEntity)
  {
    if(hitEntity.life.getCurrentValue() <= 0)
      return this.damage = 0
    
    this.damage = 0
    
    if(hitEntity == spellEntity.caster || (hitEntity.caster == spellEntity.caster && hitEntity.caster != null))
      return
    
    this.damage = spellEntity.attributeSheet.getAttribute('spell_damage').getModifiedValue()
    
    if(spellEntity.overTime)
      this.damage = this.damage/(spellEntity.spellCore.coolDownComp.calculateCooldownTime())
    
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    let type = spellEntity.spellCore.elementType
    let resistance = hitEntity.attributeSheet.getAttribute('spell_'+type + '_resistance')
    
    if(resistance == null)
      resistance = 0
    else resistance = resistance.getModifiedValue()
    
    this.damage = this.damage * effectiveness
    
    let dmg = this.damage * (1-Math.min(resistance, 70)/100)
  
    hitEntity.life.damage(dmg,spellEntity)
  }
}

console.log(ElementalDamageModule.name+' loaded...')