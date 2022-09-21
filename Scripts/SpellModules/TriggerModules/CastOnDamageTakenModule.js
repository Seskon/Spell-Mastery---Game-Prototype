//this spell gets cast when the caster takes dmg
class CastOnDamageTakenModule extends TriggerModule
{
  static displayName = 'Cast when damaged'

  static description = ['The cast when damaged module triggers when the owner of the core gets hit by a damaging spell. This spell can not be casted directly']
  
  constructor()
  {
    super(SpellTriggerTypes.onDamageTaken)
  }
}

console.log(CastOnDamageTakenModule.name+' loaded...')