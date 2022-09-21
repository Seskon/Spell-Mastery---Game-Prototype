class InventoryComponent extends Component
{
  ID = 'INVENTORY'
  
  cores = new ItemList()
  modules = new ItemList()
  
  items = {"core": this.cores, "module": this.modules}
  
  constructor(owner)
  {
    super()
    this.owner = owner
  }
  
  setupComplete()
  {
    this.equipment = new EquipmentComponent()
    this.gameObject.addComponent(this.equipment)
  }
  
  storeItem(item)
  {
    this.items[item.type].addItem(item)
    item.state = 1
    
    item.getComponent('SPRITE').enabled = false
    item.getComponent('CLICK').enabled = false
    this.gameObject.addChild(item)
    item.setOwner(this.gameObject)
  }
  
  dropItem(item)
  {
    this.removeItem(item)
    item.moveTo(_gameManager.player.pos)
    item.setOwner(null)
  }
  
  removeItem(item)
  {
    this.items[item.type].removeItem(item)
  }
  
  mergeAllCores()
  {
    this.mergeCoresToRarity(this.cores.rarity['normal'], Rarity.magic)
    this.mergeCoresToRarity(this.cores.rarity['magic'], Rarity.rare)
    this.mergeCoresToRarity(this.cores.rarity['rare'], Rarity.unique)
  }
  
  mergeCoresToRarity(list, targetRarity)
  {
    let unlockedCores = this.getUnlockedCores(list)
    let numCores = Math.floor(unlockedCores.length/3)
    
    this.removeMergedCores(unlockedCores, numCores*3)
    this.createNewCores(numCores, targetRarity)
  }
  
  removeMergedCores(unlockedCores, numCores)
  {
    for(let i = 0; i < numCores; i++)
      this.removeItem(unlockedCores[i])
  }
  
  createNewCores(numCores, targetRarity)
  {
    for(let i = 0; i < numCores; i++)
      this.storeItem(new SpellCoreItem(0, 0, null, targetRarity))
  }
  
  getUnlockedCores(list)
  {
    let unlockedCores = []
    
    for(let item of list.items)
      if(!item.isLocked && item.isInspected)
          unlockedCores.push(item)
          
    return unlockedCores
  }
}

console.log(InventoryComponent.name+' loaded...')