class NodeSelectionScene extends Scene
{
  nodeSize = new Vector2(15)
  selectorSize = new Vector2(19)
  selectorOffset = new Vector2(2)
  margin = 10
  statObjects = []
  selectedNode = null
  
  reroll()
  {
    this.setup()
    this.createBackGround()
    this.createStatBox()
    this.createNodeSelector()
    this.displayNodes()
    this.createSelectButton()
    this.createInventoryButton()
    this.createCharacterButton()
  }
  
  setup()
  {
    this.clear()
    this.canvas = _gameManager.canvasManager.canvas
    this.buttonSize = new Vector2((this.canvas.width-this.margin*2-2)/3,15)
  }
  
  createBackGround()
  {
    let background = new GameObject(0,0)
    
    background.addComponent(new RectangleRenderComponent(new Vector2(this.canvas.width,this.canvas.height),'white'))
    this.addGUIObject(background)
  }
 
  createCharacterButton()
  {
    let pos = new Vector2(this.margin+this.buttonSize.x*2+2, this.canvas.height*0.8 + this.margin)
    
    let button = new TextButton(3, pos, this.buttonSize, 'black', 'white', 'character', () => {_gameManager.sceneManager.openScene(CharacterAttributeDisplayScene)})
    
    this.addGUIObject(button)
  }
 
  createInventoryButton()
  {
    let pos = new Vector2(this.margin+this.buttonSize.x+1, this.canvas.height*0.8 + this.margin)
    
    let button = new TextButton(3, pos, this.buttonSize, 'black', 'white', 'inventory', () => {_gameManager.sceneManager.openScene(InventoryScene)})
    
    this.addGUIObject(button)
  }
  
  createSelectButton()
  {
    let pos = new Vector2(this.margin, this.canvas.height*0.8 + this.margin)
    
    let button = new TextButton(3, pos, this.buttonSize, 'red', 'white', 'select', () => {this.openPassiveTree()})
    
    this.addGUIObject(button)
  }
  
  openPassiveTree()
  {
    let scene = _gameManager.sceneManager.openScene(PassiveTreeDisplayScene,true,true,true)
  
    scene.displayPassiveTree(_gameManager.player.passiveTree, this.selectedNode)
  }
  
  createNodeSelector()
  {
    this.selector = new GameObject(this.margin*2 -2, this.margin-2)
    this.selector.addComponent(new RectangleRenderComponent(this.selectorSize, 'black', 2))
    this.addGUIObject(this.selector)
  }
  
  displayNodes()
  {
    let nodes = this.generateNodes()
    for(let i in nodes)
      this.createNodeDisplayButton(i, nodes[i])
      
    this.displayNodeStats(nodes[0])
    this.selectedNode = nodes[0]
  }
  
  createNodeDisplayButton(index, node)
  {
    let button = new GameObject(this.margin*2 + index*(this.nodeSize.y+10), this.margin)
    
    button.addComponent(new RectangleRenderComponent(this.nodeSize, node.rarity[2]))
    button.addComponent(new SpriteComponent('Node_'+node.typeKey))
    button.addComponent(new ClickComponent(4, this.nodeSize,
      () => { this.onSelect(node, button) }))
    
    this.addGUIObject(button)
  }
  
  onSelect(node, button)
  {
    this.displayNodeStats(node)
    this.selector.moveTo(button.pos.copy().subtract(this.selectorOffset))
    this.selectedNode = node
  }
  
  displayNodeStats(node)
  {
    this.stats.clear()
    
    for(let mod of node.modifierList.items)
      if(mod != null)
        this.stats.addTextLine(mod.description)
  }
  
  createStatBox()
  {
    let top = this.margin + this.nodeSize.x + this.margin
    
    let size = new Vector2(this.canvas.width - this.margin*2, this.canvas.height*0.7)
    
    this.box = new GameObject(this.margin, top)
    
    this.box.addComponent(new RectangleRenderComponent(size, 'black'))
    this.stats = new TextRenderComponent(new Vector2(this.margin), size.x - this.margin*2, 'white')
    this.box.addComponent(this.stats)
    
    this.addGUIObject(this.box)
  }
  
  generateNodes()
  {
    let nodes = []
    
    for(let i = 0; i < 3; i++)
      nodes.push(new NodeItem(0,0))
    
    return nodes
  }
}

console.log(NodeSelectionScene.name+' loaded...')