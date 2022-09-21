class Item extends GameObject
{
  modifierList = new List()
  modifierCount = 0
  isInspected = false
  isLocked = false
  
  constructor(x,y,image,rarity,type)
  {
    super(x,y)
    
    this.image = image
    this.rarity = rarity
    this.type = type //spellcor, module
    this.maxModifier = (this.rarity[0]+1)*2
    this.exec = () => { _gameManager.player.inventory.storeItem(this)}
    
    this.setupComponents()
    this.generateRandomModifier()
  }
  
  setupComponents()
  {
    this.addComponent(new SpriteComponent(this.image))
    this.addComponent(new ClickComponent(2, new Vector2(10), () => {this.exec()}))
  }
  
  generateRandomModifier()
  {
    for(let i = 0; i < this.maxModifier; i++)
      this.addAttributeModifier(AttributeModifier.getRandom())
  }
  
  addAttributeModifier(mod)
  {
    if(this.modifierCount < this.maxModifier)
    {
      this.modifierList.add(mod)
      this.modifierCount++
    }
  }
  
  setOwner(owner)
  {
    this.owner = owner
  }
  
  onEquip(){}
  display(){}
}

console.log(Item.name+' loaded...')