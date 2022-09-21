class Level
{
  constructor(level)
  {
    super()
    
    this.level = level
    this.rewardType = LevelRewardTypes.random()
    //this.scene = this.randomScene()
    //generate modifier
  }
  
  loadScene()
  {
    //open perbuild map
    //apply map modifier to enemies
  }
}

class LevelRewardTypes
{
  spellCore = 'spellCore'
  spellModule = 'spellModule'
  statItem = 'statItem'

  random()
  {
    let random = Math.random()
    
    if(random < 0.5)
      return this.statItem
    if(random < 0.8)
      return this.spellModule
    
    return this.spellCore
  }
}