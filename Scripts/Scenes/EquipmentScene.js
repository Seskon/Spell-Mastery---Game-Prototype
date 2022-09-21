class EquipmentScene extends Scene
{
  margin = 5
  itemSlotSize = new Vector2(12)
  itemSlotObjects = new List()
  
  load()
  {
    this.calculateWindow()
    this.calculateCenterPosition()
    this.calculateGridDimensions()
    this.createWindowBackground()
    this.createEquipmentSlots()
    
    this.equipment = _gameManager.player.equipment
  }
  
  calculateGridDimensions()
  {
    this.gridDimension = new Vector2(
      this.itemSlotSize.x * 3 + this.margin*2,
      this.itemSlotSize.y * 3 + this.margin*2
    )
  }
  
  calculateCenterPosition()
  {
    this.centerPos = this.windowDimension.copy().divide(2)
    this.centerPos.add(this.windowPos)
  }
  
  calculateWindow()
  {
    let inventoryItemDisplayScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryItemDisplayScene.name).items[0]
    
    let inventoryScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryScene.name).items[0]
    
    this.windowDimension = new Vector2(
      inventoryScene.windowDimension.x - inventoryItemDisplayScene.windowDimension.x - this.margin,
      inventoryScene.windowDimension.y/3 - this.margin
    )
    
    this.windowPos = inventoryScene.windowPos.copy()
  }
  
  beforeActive()
  {
    this.updateEquipmentSlots()
  }
  
  createWindowBackground()
  {
    this.windowBackground = new GameObject(this.windowPos.x,this.windowPos.y)
    
    this.windowBackground.addComponent(new RectangleRenderComponent(this.windowDimension, "white"))
      
    this.addGUIObject(this.windowBackground)
  }
  
  updateEquipmentSlots()
  {
    let equippedCores = this.equipment.items.core
    
    for(let i in equippedCores)
    {
      if(i == 4) continue
      
      this.updateSlot(i, equippedCores)
    }
  }
  
  updateSlot(i, equippedCores)
  {
    let index = (i > 4 ? i-1 : i)
    let itemSlot = this.itemSlotObjects.items[index]
    itemSlot.removeItem()
    itemSlot.setItem(equippedCores[i])
  }
  
  createEquipmentSlots()
  {
    for(let i = 0; i<9; i++)
    {
      if(i==4) continue
      
      this.createItemSlotByIndex(i)
    }
  }
  
  createItemSlotByIndex(i)
  {
    let pos = new Vector2(
        Math.round(this.centerPos.x - this.gridDimension.x/2),
        Math.round(this.centerPos.y - this.gridDimension.y/2)
      )
      
    this.calculateSlotPosByIndex(pos, i)
    this.createItemSlot(pos, i)
  }
  
  calculateSlotPosByIndex(pos, i)
  {
    pos.x += i%3 * (this.itemSlotSize.x+this.margin)
    pos.y += Math.floor(i/3) * (this.itemSlotSize.y+this.margin)
  }
  
  createItemSlot(pos, i)
  {
    let itemSlot = new ItemSlot(4, pos, this.itemSlotSize, (targetSlotIndex)=>{this.equipment.swapCores(targetSlotIndex,i)
    })
    
    this.itemSlotObjects.add(itemSlot)
    this.addGUIObject(itemSlot)
    
    return itemSlot
  }
}

console.log(EquipmentScene.name+' loaded...')