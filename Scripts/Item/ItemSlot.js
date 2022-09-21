class ItemSlot extends GameObject
{
  constructor(layerIndex, position, dimension)
  {
    super(position.x, position.y)
    
    this.layerIndex = layerIndex
    this.position = position
    this.dimension = dimension
    
    this.setupComponents()
  }
  
  setupComponents()
  {
    this.spriteComp = new SpriteComponent(null, new Vector2(-1))
    this.addComponent(this.spriteComp)
    
    this.setupEquipWheelComponent()
    
    this.back = new RectangleRenderComponent(this.dimension, '#00000000')
    this.addComponent(this.back)
    
    this.frame = new RectangleRenderComponent(this.dimension, 'black',2)
    this.addComponent(this.frame)
  }
  
  setupEquipWheelComponent()
  {
    this.addComponent(new EquipWheelComponent(
      this.layerIndex, this.dimension,
      (index) => {this.equip(index)}, 
      () => {this.onSelection()}
    ))
  }
  
  onSelection()
  {
    this.item.display()
    this.checkInspection()
  }
  
  checkInspection()
  {
    if(this.item.isInspected)
      return
    
    this.back.color = '#00000000'
    this.item.isInspected = true
  }
  
  equip(index)
  {
    _gameManager.player.equipment.moveItemToSlot(index, this.item)
  }
  
  setItem(item)
  {
    if(item == null)
      return this.frame.color = 'black'

    this.item = item
    this.spriteComp.setImageSource(item.getComponent("SPRITE").src)
    
    this.setupColors()
  }
  
  setupColors()
  {
    this.frame.color = this.item.rarity[2]
    this.setupBackgroundColor()
  }
  
  setupBackgroundColor()
  {
    if(!this.item.isInspected)
      this.back.color = '#FFFFFF99'
    if(this.item.isLocked)
      this.back.color = '#00000099'
  }
  
  removeItem()
  {
    this.item = null
    this.spriteComp.setImageSource(null)
  }
}

console.log(ItemSlot.name+' loaded...')