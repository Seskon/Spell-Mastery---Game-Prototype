class RepeatModule extends Module
{
  static tag = 'repeat'
  static displayName = 'Repeat'

  static description = ['The repeat module repeatetly casts the spell to the target location']
  
  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    caster.addComponent(new SpellRepeatComponent(spellCore, targetPosition, castIndex))
    
    return true
  }
}

console.log(RepeatModule.name+' loaded...')