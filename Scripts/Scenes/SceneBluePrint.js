class SceneBluePrint
{
  static lushGreen = new SceneBluePrint(new Vector2(200,1000), 100, 0.1, true, [EnemieTypes.littleTreeSpirit,EnemieTypes.mediumTreeSpirit], EnemieTypes.bossTreeSpirit, [['Tree', 0.0001], ['Bush', 0.0001], ['Stone', 0.0001]], '#91EE7CFF')
  
  static hotRed = new SceneBluePrint(new Vector2(200,1000), 100, 0.1, true, [EnemieTypes.littleDevil,EnemieTypes.mediumDevil], EnemieTypes.bossDevil, [['Spike', 0.0005]], '#ED7B7BFF')
  
  static coolBlue = new SceneBluePrint(new Vector2(200,1000), 100, 0.1, true, [EnemieTypes.littleWaterWale,EnemieTypes.mediumWaterWale], EnemieTypes.bossWaterWale, [['WaterBubble', 0.0001],['Rock', 0.0001]], '#7BDEEDFF')
  
  static burnedGray = new SceneBluePrint(new Vector2(200,1000), 100, 0.1, true, [EnemieTypes.littleFireSpirit,EnemieTypes.mediumFireSpirit], EnemieTypes.bossFireSpirit, [['BurnedWood', 0.0005]], '#4F4F4FFF')
  
  static shockingPurple = new SceneBluePrint(new Vector2(200,1000), 100, 0.1, true, [EnemieTypes.littleLightSpirit,EnemieTypes.mediumLightSpirit], EnemieTypes.bossLightSpirit, [['Statue', 0.0005]], '#A87BEDFF')
  
  static bluePrints = [SceneBluePrint.lushGreen, SceneBluePrint.hotRed, SceneBluePrint.shockingPurple, SceneBluePrint.burnedGray, SceneBluePrint.coolBlue]
  
  constructor(size, clusterSpace, clusterDensity, spawnEnemies, enemieTypes, bossBluePrint, environmentProps, backgroundColor)
  {
    this.size = size
    this.clusterSpace = clusterSpace
    this.clusterRadius = clusterSpace/2
    this.clusterDensity = clusterDensity
    this.spawnEnemies = spawnEnemies 
    this.enemieTypes = enemieTypes
    this.bossBluePrint = bossBluePrint
    this.environmentProps = environmentProps
    this.backgroundColor = backgroundColor
  }
  
  static getRandom()
  {
    let index = Math.round(Math.random() * (SceneBluePrint.bluePrints.length-1))
    
    return SceneBluePrint.bluePrints[index]
  }
}

console.log(SceneBluePrint.name + ' loaded...')