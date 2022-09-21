class World
{
  levelDictionary = {}
  
  maze = new Maze(new Vector2(30))
  
  openLevel(pos)
  {
    levelDictionary[positionToKey(pos)].load()
  }
  
  positionToKey(pos)
  {
    return pos.x + ',' + pos.y
  }
  
  completeLevel(pos)
  {
    levelDictionary[positionToKey(pos)].complete()
    
    createNewLevel((new Vector2(1,0)).add(pos))
    createNewLevel((new Vector2(-1,0)).add(pos))
    createNewLevel((new Vector2(0,1)).add(pos))
    createNewLevel((new Vector2(0,-1)).add(pos))
  }
  
  createNewLevel(pos)
  {
    let key = positionToKey(pos)
    
    if(levelDictionary[key] == null)
      levelDictionary[key] = new Level()
  }
  
  getLevel(pos)
  {
    return levelDictionary[positionToKey(pos)]
  }
  
  swapLevel(pos1, pos2)
  {
    let key1 = positionToKey(pos1)
    let key2 = positionToKey(pos2)
    
    let temp = levelDictionary[key1]
    levelDictionary[key1] = levelDictionary[key2]
    
    levelDictionary[key2] = temp
  }
}