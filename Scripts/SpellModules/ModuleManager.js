class ModuleManager
{
  activeModules = new List()
  modules = {}
  tagDictionary = {}
  
  level = 1
  xp = 0
  targetXP = 100
  xpInPercent = 0
  
  constructor(spellCore, modules, level = 1)
  {
    this.spellCore = spellCore
    this.maxLevel = (spellCore.rarity[0]+1)*2
    this.level = Math.min(level, this.maxLevel)
    
    if(modules == null)
      this.generateRandomModules()
    else
      for(let mod of modules)
        this.addModule(mod[0], mod[1])
  }
  
  addXP(amount)
  {
    if(this.level == 'max')
      return
    
    this.xp += amount
    let over = this.xp - this.targetXP

    if(over >= 0)
    {
      this.xp = this.targetXP
      this.levelUp(over)
    }
    
    this.xpInPercent = this.xp/this.targetXP
  }
  
  levelUp(over)
  {
    this.xp = over
    this.level++
    this.targetXP*=2
    
    if(this.level == this.maxLevel)
    {
      this.xp = 0
      this.xpInPercent = 0
      this.level = 'max'
    }
  }
  
  generateRandomModules()
  {
    let numMods = (this.spellCore.rarity[0]+1)*2
    
    for(let i = 0; i < numMods; i++)
    {
      let index = ModuleNameCollection.getRandomIndex()
      while(this.modules[index] != null)
        if(index < ModuleNameCollection.names.length-1)
          index++
        else index = 0
      
      this.addModule(index)
    }
  }
  
  addModule(moduleIndex, setActive = false)
  {
    let moduleClass = ModuleNameCollection.getName(moduleIndex)
    let module = new moduleClass()
    module.index = moduleIndex
    module.active = false
    this.modules[moduleIndex] = module
    
    this.tagDictionary[moduleClass.tag] = true

    if(setActive)
      this.activateModule(module)

    return module
  }
  
  activateModule(module)
  {
    if(module == null || this.activeModules.length >= this.level)
      return

    this.activeModules.add(module)
    module.active = true
    module.onEquip(this.spellCore)
  }
  
  getModule(moduleIndex)
  {
    return this.modules[moduleIndex]
  }
  
  deactivateModule(module)
  {
    module.onRemove(this)
    delete this.tagDictionary[module.tag]
    this.activeModules.remove(module)
    module.active = false
  }
  
  removeModule(module)
  {
    this.deactivateModule(module)
    delete this.modules[module.index]
  }
  
  toggelModule(module)
  {
    if(module.active)
      this.deactivateModule(module)
    else
      this.activateModule(module)
  }
  
  distributeEvent(event)
  {
    if(event.xp != null)
      this.addXP(event.xp)
    
    for(let i = 0; i < this.activeModules.length; i++)
      this.activeModules.items[i].onEvent({...event})
  }
  
  hasModule(index)
  {
    return this.modules[index] != null
  }
}

console.log(ModuleManager.name+' loaded...')