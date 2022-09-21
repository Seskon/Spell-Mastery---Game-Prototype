class EnemieTypes 
{
  static littleTreeSpirit = 
  new EnemieBlueprint(ElementalTypes.earth, 'Enemie_littleTreeSpirit',.5,[[[3,true]]], new RangedCasterFollowBehaviour(100, 0.3, 20))
  
  static mediumTreeSpirit = 
  new EnemieBlueprint(ElementalTypes.earth, 'Enemie_mediumTreeSpirit',2,[[[3,true],[5,true]]], new RangedCasterFollowBehaviour(70, 0.2, 45))
  
  static bossTreeSpirit = 
  new EnemieBlueprint(ElementalTypes.earth, 'Enemie_bossTreeSpirit',10, [[[3,true],[5,true]],
    [[3,true],[0, true]],
    [[3,true],[19,true]]], 
    new RangedCasterFollowBehaviour(250, 0.05, 200),true)
  
  
  static littleDevil = 
  new EnemieBlueprint(ElementalTypes.chaos, 'Enemie_littleDevil',.5,[[[3,true]]], new RangedCasterFollowBehaviour(100, 0.3, 20))
  
  static mediumDevil = 
  new EnemieBlueprint(ElementalTypes.chaos, 'Enemie_mediumDevil',2,[[[3,true],[5,true]]], new RangedCasterFollowBehaviour(70, 0.2, 45))
  
  static bossDevil = 
  new EnemieBlueprint(ElementalTypes.chaos, 'Enemie_bossDevil',10,
    [[[3,true],[5,true]],
    [[3,true],[0, true]],
    [[3,true],[6,true],[0,true]]],
    new RangedCasterFollowBehaviour(250, 0.05, 200),true)
  
  
  static littleWaterWale = 
  new EnemieBlueprint(ElementalTypes.water, 'Enemie_littleWaterWale',.5,[[[3,true]]], new RangedCasterFollowBehaviour(100, 0.3, 20))
  
  static mediumWaterWale = 
  new EnemieBlueprint(ElementalTypes.water, 'Enemie_mediumWaterWale',2,[[[3,true],[5,true]]], new RangedCasterFollowBehaviour(70, 0.2, 45))
  
  static bossWaterWale = 
  new EnemieBlueprint(ElementalTypes.water, 'Enemie_bossWaterWale',10,
  [[[3,true],[5,true]],
  [[3,true],[1, true]],
  [[3,true],[21,true]]], new RangedCasterFollowBehaviour(250, 0.05, 200),true)
  
  
  static littleFireSpirit = 
  new EnemieBlueprint(ElementalTypes.fire, 'Enemie_littleFireSpirit',.5,[[[3,true]]], new RangedCasterFollowBehaviour(100, 0.3, 20))
  
  static mediumFireSpirit = 
  new EnemieBlueprint(ElementalTypes.fire, 'Enemie_mediumFireSpirit',2,[[[3,true],[5,true]]], new RangedCasterFollowBehaviour(70, 0.2, 45))
  
  static bossFireSpirit = 
  new EnemieBlueprint(ElementalTypes.fire, 'Enemie_bossFireSpirit',10, 
    [[[3,true],[5,true]],
    [[3,true],[1, true]],
    [[3,true],[23,true],[0,true]]],
    new RangedCasterFollowBehaviour(250, 0.05, 200),true)
  
  
  static littleLightSpirit = 
  new EnemieBlueprint(ElementalTypes.lighting, 'Enemie_littleLightSpirit',.5,[[[3,true]]], new RangedCasterFollowBehaviour(100, 0.3, 20))
  
  static mediumLightSpirit = 
  new EnemieBlueprint(ElementalTypes.lightning, 'Enemie_mediumLightSpirit',2,[[[3,true],[5,true]]], new RangedCasterFollowBehaviour(70, 0.2, 45))
  
  static bossLightSpirit = 
  new EnemieBlueprint(ElementalTypes.lightning, 'Enemie_bossLightSpirit',10,[[[3,true],[5,true]],
    [[3,true],[1, true]],
    [[3,true],[24,true],[0,true]]],
    new RangedCasterFollowBehaviour(250, 0.05, 200),true)
}

console.log(EnemieTypes.name+' loaded...')