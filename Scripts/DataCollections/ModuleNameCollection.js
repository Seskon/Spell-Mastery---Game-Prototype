class ModuleNameCollection
{
  static attributeModuleCollection = [
    AreaModule, CooldownModule, CriticalModule, ElementalDamageModule, ElementalResistanceModule, TravelerModule
  ]
  //5
  static castModuleCollection = [
    BurstModule, ChannelModule, ChargeModule, RandomModule, RepeatModule
  ]
  //10
  static lifeModuleCollection = [
    LifeModule, LifeRechargeModule, HealModule, DrainModule, ReserveModule
  ]
  //15
  static travelModuleCollection = [
    AttachModule, OrbitModule, PhysicalModule, ChainModule
  ]
  //19
  static specialModuleCollection = [
    BlindModule, DurationModule, GravityModule, LeechModule, StackModule, StunModule
  ]
//28
  static triggerModuleCollection = [
    CastOnCriticalStrikeModule, CastOnDamageTakenModule, CastOnDeathModule, CastOnHitModule, CastOnKillModule//, MineModule, TrapModule
  ]

  static names = [
    ...ModuleNameCollection.attributeModuleCollection,
    ...ModuleNameCollection.castModuleCollection,
    ...ModuleNameCollection.lifeModuleCollection,
    ...ModuleNameCollection.travelModuleCollection,
    ...ModuleNameCollection.specialModuleCollection,
    ...ModuleNameCollection.triggerModuleCollection
    ]
    
  static getIndex(name)
  {
    for(let [i,n] of ModuleNameCollection.names.entries())
      if(name == n)
        return i
  }
  
  static getName(i)
  {
    return ModuleNameCollection.names[i]
  }
  
  static getRandomIndex()
  {
    return Math.round(Math.random()*(ModuleNameCollection.names.length-1))
  }
}
  
console.log('ModuleNameCollection loaded...')