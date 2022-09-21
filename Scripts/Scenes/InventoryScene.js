class InventoryScene extends Scene
{
  margin = 10
  closeButtonSize = new Vector2(12)
  
  load()
  {
    _gameManager.player.setActive(false)
    this.calculateWindow()
    this.createWindowBackground()
    this.createCloseButton()
  }
  
  calculateWindow()
  {
    this.windowDimension = new Vector2(
      _gameManager.canvasManager.canvas.width - this.margin*2,
      _gameManager.canvasManager.canvas.height - this.margin*2
    )
    
    this.windowPos = new Vector2(this.margin)
  }
  
  createWindowBackground()
  {
    this.windowBackground = new GameObject(this.windowPos.x-5,this.windowPos.y-5)
    this.windowBackground.addComponent(new RectangleRenderComponent(this.windowDimension.copy().add(new Vector2(10)), "black"))
    
    this.addGUIObject(this.windowBackground)
  }
  
  beforeActive()
  {
    let sceneManager = _gameManager.sceneManager
    
    this.inventoryItemDisplayScene = sceneManager.openScene(InventoryItemDisplayScene, true)

    this.spellCoreDisplayScene = sceneManager.openScene(SpellCoreDisplayScene, true)

    this.equipmentScene = sceneManager.openScene(EquipmentScene, true)
  }
  
  refresh()
  {
    this.closeScenes()
    this.beforeActive()
  }
  
  closeScenes()
  {
    _gameManager.sceneManager.closeScene(this.spellCoreDisplayScene)
    _gameManager.sceneManager.closeScene(this.equipmentScene)
    _gameManager.sceneManager.closeScene(this.inventoryItemDisplayScene)
  }
  
  createCloseButton()
  {
    let pos = new Vector2(
      this.windowPos.x + this.windowDimension.x,
      this.windowPos.y - this.closeButtonSize.y
    )
    
    let button = new TextButton(3, pos, this.closeButtonSize, 'red', 'black','', ()=>{
      _gameManager.sceneManager.closeScene(this)
      _gameManager.sceneManager.activateAllScenes()
    })
    this.addGUIObject(button)
  }
  
  onClose()
  {
    this.closeScenes()
    _gameManager.player.setActive(true)
  }
}

console.log(InventoryScene.name+' loaded...')