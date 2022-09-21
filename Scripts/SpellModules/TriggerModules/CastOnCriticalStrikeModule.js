//this spell gets casted on Critical strike
class CastOnCriticalStrikeModule extends TriggerModule
{
  static displayName = 'Cast On Crit'
  static description = ['The cast on crit module triggers when the owner of the core lands a critical strike with any spell. This spell can not be casted directly']
  
  constructor()
  {
    super(SpellTriggerTypes.onCrit)
  }
}

console.log(CastOnCriticalStrikeModule.name+' loaded...')