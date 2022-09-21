class RandomModule extends Module
{
  static displayName = 'Random'
  static description = ['The random module adds a random module to the core each cast']
  
  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    let moduleManager = spellCore.moduleManager
    let module = moduleManager.getModule(this.moduleIndex)
    
    if(module != null)
      moduleManager.removeModule(module)

    this.getRandomModule()
    
    while(moduleManager.hasModule(this.moduleIndex))
      this.getRandomModule()
    
    module = moduleManager.addModule(this.moduleIndex)
    moduleManager.activateModule(module)
    module.isTemporary = true
    spellCore.requestCast(caster, targetPosition, castIndex)
    return true
  }
  
  getRandomModule()
  {
    this.moduleIndex = ModuleNameCollection.getRandomIndex()
  }
  
  onRemove(moduleManager)
  {
    if(this.moduleIndex == null)
      return
    
    let module = moduleManager.getModule(this.moduleIndex)
    moduleManager.removeModule(module)
  }
}

console.log(RandomModule.name+' loaded...')