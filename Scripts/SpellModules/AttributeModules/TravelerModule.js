class TravelerModule extends TemporaryAttributeModule
{
  static tag = "movement"
  static displayName = 'Traveler'

  static description = ['The traveler module increases the movement speed of the spell and also of the targets that get hit while the spell is active']

  constructor()
  {
    super(30, 'move_speed')
  }
}

console.log(TravelerModule.name+' loaded...')