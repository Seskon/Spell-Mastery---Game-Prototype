class SceneryObject extends GameObject
{
  static types = {
    Tree: 2,
    Bush: 2,
    Stone: 2,
    Spike: 2,
    BurnedWood: 3,
    Statue: 4,
    Rock: 2,
    WaterBubble: 2
  }
  
  constructor(x,y, type)
  {
    super(x, y)
    
    let rand = Math.round(Math.random()*(SceneryObject.types[type]-1))
    let src = type+'_'+rand

    this.addComponent(new SpriteComponent(type+'_'+rand))
    this.layer = 2
  }
}

console.log(SceneryObject.name+' loaded...')