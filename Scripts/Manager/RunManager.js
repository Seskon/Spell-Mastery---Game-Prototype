class RunManager
{
  activeGameObjects = {}
  activeGUIObjectLists = new List()
  activeEntities = {}
  
  addActiveGameObject(obj)
  {
    if(!(obj instanceof GameObject))
      return
    
    if(this.activeGameObjects[obj.layer] == null)
    {
      this.activeGameObjects[obj.layer] = new List()
      this.activeGameObjects[obj.layer].add(obj)
    }
    else
      this.activeGameObjects[obj.layer].add(obj)
    
    if(obj instanceof Entity)
      this.activeEntities[obj.ID] = obj
  }
  
  AddActiveGUIObjectList(objList)
  {
    this.activeGUIObjectLists.add(objList)
  }
  
  reset()
  {
    this.activeEntities = {}
  }
  
  /*sortLayerByPosition(obj)
  {
    let objDim = obj.getDimension()
    
    let objYPos = obj.screenPos.y + objDim.y
    
    let layerList = this.activeGameObjects[obj.layer]
    
    for(let i = 0; i < layerList.length; i++)
      if(this.insertIntoLayerAtIndex(obj, objYPos, layerList, i))
        return
    
    layerList.add(obj)
  }*/
  
  /*insertIntoLayerAtIndex(obj, objYPos, layerList, i)
  {
    let currentObj = layerList.items[i]
    let currentDim = currentObj.getDimension()
    let currentYPos = currentObj.screenPos.y+currentDim.y
      
    if(objYPos < currentYPos)
    {
      layerList.insertAtIndex(obj, i, false)
      return true
    }
  }*/
  
  run()
  {
    this.runActiveGameObjects()
    this.runActiveGUIObjects()
  }
  
  runActiveGameObjects()
  {
    for(let i in this.activeGameObjects)
      for(let j in this.activeGameObjects[i].items)
        this.activeGameObjects[i].items[j].run()
        
    this.resetRunnedGameObjects()
  }
  
  runActiveGUIObjects()
  {
    for(let i in this.activeGUIObjectLists.items)
      for(let j in this.activeGUIObjectLists.items[i].items)
        this.activeGUIObjectLists.items[i].items[j].run()
        
    this.resetRunndedGUIObjects()
  }
  
  resetRunnedGameObjects()
  {
    for(let i in this.activeGameObjects)
      for(let j in this.activeGameObjects[i].items)
        this.activeGameObjects[i].items[j].runned = false
    
    this.activeGameObjects = {}
  }
  
  resetRunndedGUIObjects()
  {
    for(let i in this.activeGUIObjectLists.items)
      for(let j in this.activeGUIObjectLists.items[i].items)
        this.activeGUIObjectLists.items[i].items[j].runned = false

    this.activeGUIObjectLists.clear()
  }
}

console.log(RunManager.name+' loaded...')