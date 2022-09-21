//triggers other equipped spellcore when this spell kills its target
//other spellcore gets casted from death location
class CastOnKillModule extends TriggerModule
{
  static displayName = 'Cast On Kill'

  static description = ['The cast on kill module triggers when the owner of the core kills another entity. This spell can not be casted directly']
  
  constructor()
  {
    super(SpellTriggerTypes.onKill)
  }
}

console.log(CastOnKillModule.name+' loaded...')