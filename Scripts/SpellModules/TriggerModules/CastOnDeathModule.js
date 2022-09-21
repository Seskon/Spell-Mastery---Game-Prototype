//this spell gets casted when the life of the caster drops to 0
class CastOnDeathModule extends TriggerModule
{
  static displayName = 'Cast On Death'
  
  static description = ['The cast on death module triggers when the owner of the core dies. This spell can not be casted directly']
  
  constructor()
  {
    super(SpellTriggerTypes.onDeath)
  }
}

console.log(CastOnDeathModule.name+' loaded...')