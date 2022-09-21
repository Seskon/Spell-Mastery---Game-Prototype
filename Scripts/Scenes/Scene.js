class Scene
{
  //[chunkPos][obj.ID] > obj
  chunks = {}
  guiObjectList = new List()

  //[gobj.ID] > {gridpositions...}
  keyDictionary = {}

  gridSize = 100
  numChunks = this.calcChunkPosition(new Vector2(
    _gameManager.canvasManager.canvas.width,
    _gameManager.canvasManager.canvas.height
  ))
  
  active = false
  loaded = false

  addGameObject(gObj)
  {
    if(gObj == null || !(gObj instanceof GameObject))
      return
    
    gObj.setScene(this)
    this.keyDictionary[gObj.ID] = new List()

    var dimension = gObj.getDimension()
    var endChunkPos = this.calcChunkPosition(gObj.pos, dimension)

    this.addGameObjectHorizontal(gObj, endChunkPos)
    this.addGameObjectVertical(gObj, endChunkPos)
  }

  addGameObjectHorizontal(gObj, endChunkPos)
  {
    var chunkPos = this.calcChunkPosition(gObj.pos)

    while(chunkPos.x <= endChunkPos.x)
    {
      this.addGameObjectToChunk(gObj, chunkPos)
      this.addGameObjectToChunk(gObj, new Vector2(chunkPos.x, endChunkPos.y))

      chunkPos.x++
    }
  }

  addGameObjectVertical(gObj, endChunkPos)
  {
    var chunkPos = this.calcChunkPosition(gObj.pos)

    while (chunkPos.y <= endChunkPos.y)
    {
      this.addGameObjectToChunk(gObj, chunkPos)
      this.addGameObjectToChunk(gObj, new Vector2(endChunkPos.x, chunkPos.y))

      chunkPos.y++
    }
  }

  addGameObjectToChunk(gObj, chunkPos)
  {
    var key = chunkPos.x + ',' + chunkPos.y

    if (this.chunks[key] == null)
      this.chunks[key] = {}

    this.chunks[key][gObj.ID] = gObj
    this.keyDictionary[gObj.ID].add(key)
  }

  removeGameObject(gObj)
  {
    var keys = this.keyDictionary[gObj.ID]
    
    if(keys == null)
      return false

    for (let key of keys.items)
      delete this.chunks[key][gObj.ID]

    delete this.keyDictionary[gObj.ID]
    gObj.scene = null
    
    return true
  }

  collectActiveGameObjects()
  {
    if(!this.active)
      return
    
    if(!_gameManager.pauseGameplay)
      this.addGameObjectsToRunManager()
  }
  
  collectActiveGUIObjects()
  {
    if(!this.active)
      return
    
    this.addGUIObjectsToRunManager()
  }

  addGUIObjectsToRunManager()
  {
    _gameManager.runManager.AddActiveGUIObjectList(this.guiObjectList)
  }

  addGameObjectsToRunManager()
  {
    let cameraChunkPos = this.calcChunkPosition(_gameManager.sceneManager.cameraPos)

    for (let x = -1; x < this.numChunks.x + 2; x++)
      for (let y = -1; y < this.numChunks.y + 2; y++)
        this.addGameObjectsFromChunk(x,y,cameraChunkPos)
  }

  addGameObjectsFromChunk(x,y,cameraChunkPos)
  {
    var key = (cameraChunkPos.x + x) + ',' + (cameraChunkPos.y + y)
    var chunk = this.chunks[key]
    
    for(var k in chunk)
      _gameManager.runManager.addActiveGameObject(chunk[k])
  }
  
  addGUIObject(guiObj)
  {
    if(guiObj == null || !(guiObj instanceof GameObject))
      return
      
    this.guiObjectList.add(guiObj)
    guiObj.setScene(this)
    guiObj.isGUIElement = true
  }

  removeGUIObject(guiObj)
  {
    guiObj.scene = null
    return this.guiObjectList.remove(guiObj)
  }
  
  updateGameObject(gameObject)
  {
    if(gameObject.scene == null)
      return
    
    if(gameObject.isGUIElement)
    {
      this.removeGUIObject(gameObject)
      this.addGUIObject(gameObject)
    }
    else
    {
      this.removeGameObject(gameObject)
      this.addGameObject(gameObject)
    }
  }
  
  calcChunkPosition(pos, offset = new Vector2())
  {
    if(pos == null)
      return new Vector2()
    
    return new Vector2(
      Math.floor((pos.x + offset.x) / this.gridSize),
      Math.floor((pos.y + offset.y) / this.gridSize)
    )
  }
  
  clear()
  {
    this.clearGameObjects()
    this.clearGUIObjects()
    this.keyDictionary = {}
  }
  
  clearGUIObjects()
  {
    while(this.guiObjectList.items.length > 0)
      if(this.guiObjectList.items[0]!=null)
        this.guiObjectList.items[0].destroy()
      else
        this.guiObjectList.items.shift()
  }
  
  clearGameObjects()
  {
    let keys = Object.keys(this.chunks)
    
    for(let key of keys)
      if(this.chunks[key] != null)
        for(let gKey of Object.keys(this.chunks[key]))
          if(this.chunks[gKey] != null)
            this.chunks[gKey].destroy()
      
    this.chunks = {}
  }
  
  reload()
  {
    this.clear()
    this.load()
    this.beforeActive()
  }

  load(){}
  beforeActive(){}
  onClose(){}
}

console.log(Scene.name+' loaded...')