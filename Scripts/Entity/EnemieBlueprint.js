class EnemieBlueprint
{
  //add spell setups
  constructor(elementType ,spriteSrc, lifeMultiplyer, coreModules, behaviour, isBoss = false)
  {
    this.elementType = elementType
    this.spriteSrc = spriteSrc
    this.lifeMultiplyer = lifeMultiplyer
    this.coreModules = coreModules
    this.behaviour = behaviour
    this.isBoss = isBoss
  }
  
  instantiate(pos, level, onDeath)
  {
    let instance = this.createInstance(pos,level)
    this.setupInstance(instance, onDeath)

    return instance
  }
  
  createInstance(pos,level)
  {
    let life = 10*level*this.lifeMultiplyer
    
    return new EnemieEntity(pos.x, pos.y, life, this.spriteSrc, level, this.isBoss)
  }
  
  setupInstance(instance, onDeath)
  {
    instance.addComponent(this.behaviour.copy())
    instance.eventManager.subscribe(onDeath)
    
    for(let [i, modules] of this.coreModules.entries())
      this.addNewCoreToInstance(instance, modules, i)
  }
  
  addNewCoreToInstance(instance, modules, index)
  {
    let core = this.createNewCore(modules)
    instance.inventory.storeItem(core)
    instance.equipment.moveItemToSlot(index, core)
  }
  
  createNewCore(modules)
  {
    return new SpellCoreItem(0, 0, modules, Rarity.unique,this.elementType, 10)
  }
}

console.log(EnemieBlueprint.name+' loaded...')