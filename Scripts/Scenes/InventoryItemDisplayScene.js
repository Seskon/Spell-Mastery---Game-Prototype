class InventoryItemDisplayScene extends Scene
{
  margin = 5
  itemSlotSize = new Vector2(12)
  gridWidth = this.itemSlotSize.x * 3 + this.margin*4
  page = 0
  mergeButtonHeight = 15
  
  beforeActive()
  {
    this.getInventoryScene()
    this.calculateWindowPosition()
    this.calculateWindowDimension()
    this.createWindowBackground()
    this.createItemSlotPage()
    this.createMergeButton()
  }
  
  getInventoryScene()
  {
    this.inventoryScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryScene.name).items[0]
  }
  
  createWindowBackground()
  {
    this.windowBackground = new GameObject(this.windowPos.x,this.windowPos.y)
    this.windowBackground.addComponent(new RectangleRenderComponent(this.windowDimension, "white"))
      
    this.addGUIObject(this.windowBackground)
  }
  
  calculateWindowDimension()
  {
    this.windowDimension = new Vector2(
      this.gridWidth,
      this.inventoryScene.windowDimension.y - this.mergeButtonHeight
    )
  }
  
  calculateWindowPosition()
  {
    this.windowPos = new Vector2(
      this.inventoryScene.windowPos.x + this.inventoryScene.windowDimension.x - this.gridWidth,
      this.inventoryScene.windowPos.y
    )
  }
  
  createItemSlotPage()
  {
    let dimensions = this.windowDimension.copy().subtract(new Vector2(this.margin))
    let itemSlotSpace = this.itemSlotSize.x + this.margin
    let gridDimension = dimensions.divide(itemSlotSpace).floor()
    let itemSlotsOnPage = gridDimension.x * gridDimension.y
    let cores = _gameManager.player.inventory.cores
    let numItemsInInventory = cores.numberOfItems
    
    while(itemSlotsOnPage*this.page > numItemsInInventory)
      this.page--
    
    let coresArray = cores.getAllItemsAsArray()
    
    for(let y = 0; y < gridDimension.y; y++)
      for(let x = 0; x < gridDimension.x; x++)
        this.createItemSlot(x,y,gridDimension,coresArray,itemSlotSpace)
  }
  
  createItemSlot(x,y,gridDimension,coresArray,itemSlotSpace)
  {
    let index = x+y*gridDimension.x
        
    if(index >= coresArray.length)
      return
        
    let item = coresArray[index]
    let position = new Vector2(
      this.windowPos.x + this.margin + (itemSlotSpace) *x,
      this.windowPos.y + this.margin + (itemSlotSpace) *y
    )
        
    let itemSlot = new ItemSlot(5, position, this.itemSlotSize, item.rarity)
        
    itemSlot.setItem(item)
    this.addGUIObject(itemSlot)
  }
  
  createMergeButton()
  {
    let pos = this.windowPos.copy()
    pos.add(new Vector2(0,this.windowDimension.y))
    
    let size = new Vector2(this.windowDimension.x, this.mergeButtonHeight)
    
    let button = new TextButton(4, pos, size, 'red', 'white', 'merge', () => {this.onMerge()})
    this.addGUIObject(button)
  }
  
  onMerge()
  {
    _gameManager.player.inventory.mergeAllCores()
    this.reload()
  }
  
  onClose()
  {
    this.clear()
  }
}

console.log(InventoryItemDisplayScene.name+' loaded...')