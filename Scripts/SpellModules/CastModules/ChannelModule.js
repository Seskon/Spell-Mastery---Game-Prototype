class ChannelModule extends Module
{
  static tag = 'channel'
  static displayName = 'Channel'

  static description = ['The channel module casts the spell repeatetly while the caster is not moving. Each repeat increases the effectiveness.']

  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    caster.canCast = false
    spellCore.isInUse = true
    
    caster.addComponent(new SpellChannelComponent(spellCore, targetPosition, castIndex))
    
    return true
  }
}

console.log(ChannelModule.name+' loaded...')