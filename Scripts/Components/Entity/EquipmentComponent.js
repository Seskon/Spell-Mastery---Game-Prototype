class EquipmentComponent extends Component
{
  ID = 'EQUIPWHEEL'
  
  equippedCores = [null, null, null,
                   null, null, null,
                   null, null, null]
  
  items = {
    core : this.equippedCores
  }
  
  modCollection = {}
  
  constructor(owner)
  {
    super()
    this.owner = owner
  }
    
  equipItem(item, index)
  {
    if(item.type == 'core' && index == 4)
      return

    this.moveItemToInventory(item.type, index)
    this.items[item.type][index] = item
    this.owner.distributeModifierList(item.modifierList)
    this.setupEquippedItem(item)
  }
  
  moveItemToInventory(type, index)
  {
    let itemArray = this.items[type]
    let item = itemArray[index]
    
    if(item != null)
      this.owner.inventory.storeItem(item)
      
    itemArray[index] = null
  }
  
  setupEquippedItem(item)
  {
    this.owner.inventory.dropItem(item)
    //item.setActive(false)
    item.setOwner(this.owner)
    item.onEquip()
  }
  
  moveItemToSlot(targetIndex, item)
  {
    if(item == null)
      return
    
    let itemIndex = this.getIndexOfEquippedItem(item)
    
    if(itemIndex == -1)
      this.equipItem(item, targetIndex)
    else
      this.swapItems(item,targetIndex,itemIndex)
    
    this.refreshInventoryScene()
  }
  
  refreshInventoryScene()
  {
    let invScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryScene.name).items[0]
    
    if(invScene != null)
      invScene.refresh()
  }
  
  swapItems(item,targetIndex,itemIndex)
  {
    let itemArray = this.items[item.type]
    let temp = itemArray[targetIndex]
    itemArray[targetIndex] = itemArray[itemIndex]
    itemArray[itemIndex] = temp
  }
  
  getIndexOfEquippedItem(item)
  {
    if(item == null)
      return -1
    
    let itemArray = this.items[item.type]
    
    for(let i in itemArray)
      if(itemArray[i] == item)
        return i

    return -1
  }
  
  getItem(type, index)
  {
    return this.items[type][index]
  }
}

console.log(EquipmentComponent.name+' loaded...')