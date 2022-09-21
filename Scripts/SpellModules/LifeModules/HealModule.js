class HealModule extends Module
{
  static tag = "heal"
  static displayName = 'Heal'

  static description = ['The heal module restores the life of the targets that get hit']
  
  onHit(spellEntity, hitEntity)
  {
    let heal = spellEntity.attributeSheet.getAttribute('spell_heal').getModifiedValue()
    
    if(spellEntity.overTime)
      heal = heal/(spellEntity.spellCore.coolDownComp.calculateCooldownTime())
    
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    hitEntity.life.heal(heal*effectiveness,spellEntity)
  }
}

console.log(HealModule.name+' loaded...')