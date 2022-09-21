class PassiveTreeDisplayScene extends Scene
{
  nodes = new List()
  dimension = new Vector2(15)
  spacing = new Vector2(2)
  margin = 5
  buttonSize = 10
  
  load()
  {
    _gameManager.player.setActive(false)
    this.calculateWindow()
  }
  
  calculateWindow()
  {
    let canvas = _gameManager.canvasManager.canvas
    
    this.windowDimension = new Vector2(
      canvas.width,
      canvas.height
    )
    
    this.windowPos = new Vector2(this.margin)
  }
  
  beforeActive()
  {
    _gameManager.sceneManager.closeScenesWithName(InventoryScene.name)
    this.setupCameraController()
  }
  
  setupCameraController()
  {
    this.cameraTarget = new Entity(0,0)
    this.cameraTarget.lifeProgress.enabled = false
    this.cameraTarget.attributeSheet.addModifier(new AttributeModifier(AttributeModifierTypes.additive, 300, 'move_speed',null,null))
    this.addGameObject(this.cameraTarget)
    
    this.controller = new PlayerController(3, this.cameraTarget)
    this.addGUIObject(this.controller)
    
    this.resetCameraTarget()
  }
  
  resetCameraTarget()
  {
    this.cameraTarget.moveTo(new Vector2())
    _gameManager.sceneManager.cameraTarget = this.cameraTarget
    _gameManager.sceneManager.calcCameraPos()
  }
  
  displayPassiveTree(tree, placeNode = null)
  {
    this.clear()
    
    this.tree = tree
    this.placeNode = placeNode
    
    this.setupScene()
    this.setupCameraController()
    
    this.createZones()
    
    for(let key in tree.nodes)
      this.addNodeButton(key, tree.nodes[key])
  }
  
  createZones()
  {
    for(let i = 1; i < 10; i++)
      this.createRectangleZone(i*3)
  }
  
  createRectangleZone(index)
  {
    let size = new Vector2(index * (this.dimension.x + this.margin), index * (this.dimension.y + this.margin))
    
    let pos = size.copy().multiply(-1)
    pos.add(this.dimension.copy().divide(2))
    
    size = size.multiply(2)
    
    let zone = new GameObject(pos.x, pos.y)
    zone.addComponent(new RectangleRenderComponent(size, 'red', 1))
    
    this.addGameObject(zone)
  }
  
  addNodeButton(key, node)
  {
    if(this.placeNode == null && node == null)
      return
    
    let pos = key.split(',')
    let tilePos = new Vector2(parseInt(pos[0]), parseInt(pos[1]))
    
    if(node == null && !this.canSelectedNodeBePlaced(tilePos))
      return
    
    pos = new Vector2(
      parseInt(pos[0]) * (this.dimension.x + this.spacing.x),
      parseInt(pos[1]) * (this.dimension.y + this.spacing.y)
    )
    
    let button = new NodeButton(pos.round(), tilePos, node, this.dimension, this)
    this.addGameObject(button)
  }
  
  canSelectedNodeBePlaced(tilePos)
  {
    let surroundingOpenings = NodeTypes.cross.openings
    let nodeInfo = NodeTypes[this.placeNode.typeKey]
    
    for(let o of surroundingOpenings)
    {
      let targetPos = tilePos.copy().add(o)
      let targetNode = this.tree.getNode(targetPos)
      
      if(targetNode == null)
        continue
      
      let targetNodeInfo = NodeTypes[targetNode.typeKey]
      
      if(nodeInfo.hasOpening(o) ^ targetNodeInfo.hasOppositOpening(o))
        return false
    }
    
    return true
  }
  
  createWindowBackground()
  {
    let background = new GameObject(0,0)
    background.addComponent(new BlankComponent(
      () => {Paint.rectangle('gray', new Vector2(), this.windowDimension)}
      ))
    this.addGameObject(background)
  }
  
  createHideButton()
  {
    let pos = new Vector2(this.windowDimension.x - this.buttonSize - 10, 10)
    
    let button = new GameObject(pos.x, pos.y)
    this.addGUIObject(button)
    
    button.addComponent(new ClickComponent(this.buttonSize, new Vector2(7), ()=>{
      _gameManager.sceneManager.closeScene(this)
      _gameManager.sceneManager.activateAllScenes()
    }))
    
    button.addComponent(new RectangleRenderComponent(new Vector2(this.buttonSize), 'red'))
  }
  
  close()
  {
    let sceneManager = _gameManager.sceneManager
    
    sceneManager.removeScene(this)
    
    let nodeScene = sceneManager.getLoadedScenesByClassName(NodeSelectionScene.name).items[0]
    
    sceneManager.removeScene(nodeScene)
    sceneManager.activateAllScenes()
    sceneManager.cameraTarget = _gameManager.player
    _gameManager.player.setActive(true)
  }
  
  setupScene()
  {
    this.createHideButton()
  }
}

console.log(PassiveTreeDisplayScene.name+' loaded...')