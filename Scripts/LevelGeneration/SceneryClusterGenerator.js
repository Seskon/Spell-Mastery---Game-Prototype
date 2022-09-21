class SceneryClusterGenerator
{
  static generateCluster(scene,pos,type,amount,distance)
  {
    amount = Math.round(amount*0.5 + Math.random() * (amount*0.5))
    for(let i = 0; i < amount; i++)
      SceneryClusterGenerator.addSceneryObject(scene,pos,type,distance)
  }
  
  static addSceneryObject(scene,pos,type, distance)
  {
    pos = new Vector2(Math.random()*distance.x, Math.random()*distance.y).add(pos)
    pos.floor()
    let obj = new SceneryObject(pos.x,pos.y,type)
    scene.addGameObject(obj)
  }
}

console.log(SceneryClusterGenerator.name + ' loaded...')