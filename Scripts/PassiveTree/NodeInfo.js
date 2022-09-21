class NodeInfo
{
  constructor(rarity, openings, sceneData)
  {
    this.rarity = rarity
    this.openings = this.convertOpenings(openings)
    this.sceneData = sceneData
  }
  
  convertOpenings(openings)
  {
    let vectorArray = []
    
    for(let i of openings)
      vectorArray.push(this.indexToVector(i))
      
    return vectorArray
  }
  
  hasOppositOpening(opening)
  {
    for(let o of this.openings)
    {
      let match = o.copy().add(opening)
      if(match.x == 0 && match.y == 0)
        return true
    }
  }
  
  hasOpening(opening)
  {
    for(let o of this.openings)
      if(o.x == opening.x && o.y == opening.y)
        return true

    return false
  }

  indexToVector(index)
  {
    switch (index)
    {
        case 0:
          return new Vector2(0,-1)
          break;
        case 1:
          return new Vector2(1,0)
          break;
        case 2:
          return new Vector2(0,1)
          break;
        case 3:
          return new Vector2(-1,0)
          break;
        default:
          return new Vector2()
    }
  }
}

console.log(NodeInfo.name+' loaded...')