//adds an energy pool to the spell that can absorb dmg from other spells
class LifeModule extends TemporaryAttributeModule
{
  static tag = "life"
  static displayName = 'Life'

  static description = ['The life module increases the life of the spell and also of the targets that get hit while the spell is active']

  constructor()
  {
    super(100,'life_maximum')
  }
}

console.log(LifeModule.name+' loaded...')