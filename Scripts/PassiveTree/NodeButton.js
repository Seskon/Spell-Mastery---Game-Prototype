class NodeButton extends GameObject
{
  constructor(pos, tilePos, nodeItem, dimensions, passiveDisplay)
  {
    super(pos.x, pos.y)
    
    this.tilePos = tilePos
    this.nodeItem = nodeItem
    this.dimensions = dimensions
    this.passiveDisplay = passiveDisplay

    this.level = Math.abs(Math.floor(tilePos.length()/3.1))+1
    this.setupComponents()
  }
  
  setupComponents()
  {
    this.setupRenderComponent()
    this.addComponent(new ClickComponent(3, this.dimensions, () => {this.onClick()}))
  }
  
  setupRenderComponent()
  {
    if(this.nodeItem != null)
    {
      this.addComponent(new RectangleRenderComponent(this.dimensions, this.nodeItem.rarity[2]))
      this.addComponent(new SpriteComponent('Node_'+this.nodeItem.typeKey))
    }
    else
      this.addComponent(new RectangleRenderComponent(this.dimensions, 'white'))
  }
  
  onClick()
  {
    if(this.nodeItem == null)
      this.placeNode()
  }
  
  placeNode()
  {
    this.nodeItem = this.passiveDisplay.placeNode
    this.passiveDisplay.tree.addNode(this.nodeItem, this.tilePos)
    this.passiveDisplay.close()
      
    _gameManager.mainScene = _gameManager.sceneManager.openScene(GeneratorScene)
    _gameManager.mainScene.generateByBlueprint(SceneBluePrint.getRandom(),this.level)
  }
}

console.log(NodeButton.name+' loaded...')