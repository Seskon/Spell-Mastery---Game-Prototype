//this spell gets casted when other spells hit a target
class CastOnHitModule extends TriggerModule
{
  static displayName = 'Cast On Hit'

  static description = ['The cast on hit module triggers when the owner of the core lands a hit with any spell. This spell can not be casted directly']
  
  constructor()
  {
    super(SpellTriggerTypes.onHit)
  }
}

console.log(CastOnHitModule.name+' loaded...')