//gives the Spell a chance to stun its target. cannot cast while stunned
class StunModule extends Module
{
  static displayName = 'Stun'

  static description = ['The stun module allows the the spells to roll for a stunning hit. A stunning hit reduces the effectiveness of spells cast by the target for a short duration']
  
  duration = 3
  
  onHit(spellEntity, hitEntity)
  {
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    let chance = spellEntity.attributeSheet.getAttribute('spell_chance_to_stun').getModifiedValue()/100
    
    let isStunningHit = Math.random() < (chance*effectiveness)
    
    if(isStunningHit)
      hitEntity.addComponent(new SpellStunComponent(spellEntity.spellComp, this.duration*effectiveness),true)
  }
}

console.log(StunModule.name+' loaded...')