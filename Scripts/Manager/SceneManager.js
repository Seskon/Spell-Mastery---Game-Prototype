class SceneManager
{
  cameraTarget = null
  cameraPos = new Vector2()
  
  constructor()
  {
    this.activeScenes = new List()
    this.loadedScenes = new List()
  }
  
  openScene(sceneClass, once = false, forceOpen = true, mono = false)
  {
    let name = sceneClass.name
    let scene = null
    
    if(once)
    {
      let index = this.isSceneActive(name)
      
      if(index >= 0)
        return this.activeScenes.items[index]
    }
    
    scene = this.loadedScenes.items[this.isSceneLoaded(name)]
    
    if(scene == null && forceOpen)
      scene = this.instantiateScene(sceneClass)
    
    if(mono)
      this.deactivateAllScenes()
    
    this.activateScene(scene)
    return scene
  }
  
  activateScene(scene)
  {
    this.activeScenes.add(scene)
    scene.active = true
    scene.beforeActive()
  }
  
  deactivateAllScenes()
  {
    for(let i in this.activeScenes.items)
      this.activeScenes.items[i].active = false
  }
  
  activateAllScenes()
  {
    for(let i in this.activeScenes.items)
      this.activeScenes.items[i].active = true
  }
  
  instantiateScene(sceneClass)
  {
    let sceneInstance = new sceneClass()
    this.loadScene(sceneInstance)
    return sceneInstance
  }
  
  loadScene(scene)
  {
    scene.load()
    scene.loaded = true
    this.loadedScenes.add(scene)
  }
  
  removeScene(scene)
  {
    this.closeScene(scene)
    this.loadedScenes.remove(scene)
    scene.loaded = false
  }
  
  closeScene(scene)
  {
    if(scene == -1 || scene == null)
      return

    scene.onClose()
    this.activeScenes.remove(scene)
    scene.active = false
  }
  
  closeScenesWithName(name)
  {
    for(let s of this.getActiveScenesByClassName(name).items)
      this.closeScene(s)
  }
  
  isSceneLoaded(name)
  {
    for(let i in this.loadedScenes.items)
      if(this.loadedScenes.items[i].constructor.name == name)
        return i
    
    return -1
  }
  
  isSceneActive(name)
  {
    for(let i in this.activeScenes.items)
      if(this.activeScenes.items[i].constructor.name == name)
        return i
    
    return -1
  }
  
  collectActiveGameObjects()
  {
    this.calcCameraPos()
    
    for(let scene of this.activeScenes.items)
      scene.collectActiveGameObjects()
  }
  
  collectActiveGUIObjects()
  {
    this.calcCameraPos()
    
    for(let scene of this.activeScenes.items)
      scene.collectActiveGUIObjects()
  }
  
  calcCameraPos()
  {
    if (this.cameraTarget == null)
      return
    
    var dim = this.cameraTarget.getDimension()

    let canvas = _gameManager.canvasManager.canvas
    let nextPos = new Vector2(
      this.cameraTarget.pos.x - canvas.width / 2 + dim.x / 2,
      this.cameraTarget.pos.y - canvas.height / 2 + dim.y / 2
    )
    
    if(nextPos.x != null && nextPos.y != null)
      this.cameraPos.copyValues(nextPos)
  }
  
  getActiveScenesByClassName(className)
  {
    let scenesWithName = new List()
    
    for(let scene of this.activeScenes.items)
      if(scene.constructor.name == className)
        scenesWithName.add(scene)
    
    return scenesWithName
  }
  
  getLoadedScenesByClassName(className)
  {
    let scenesWithName = new List()
    
    for(let scene of this.loadedScenes.items)
      if(scene.constructor.name == className)
        scenesWithName.add(scene)
    
    return scenesWithName
  }
  
  worldToScreenPos(pos)
  {
    pos.subtract(this.cameraPos)
  }
}

console.log(SceneManager.name+' loaded...')