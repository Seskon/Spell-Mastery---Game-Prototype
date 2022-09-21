class SpellCoreDisplayScene extends Scene
{
  static name = 'spellCoreDisplay'
  
  buttons = new List()
  buttonOffset = 5
  buttonHeight = 7
  levelHeight = new Vector2(0,25)
  xpBarHeight = 7
  
  load()
  {
    this.calculateWindow()
    this.createWindowBackground()
    this.canvas = _gameManager.canvasManager.canvas
  }
  
  createWindowBackground()
  {
    this.windowBackground = new GameObject(this.windowPos.x,this.windowPos.y)
    this.windowBackground.addComponent(new RectangleRenderComponent(this.windowDimension, "white"))
      
    this.addGUIObject(this.windowBackground)
  }
  
  calculateWindow()
  {
    let inventoryItemDisplayScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryItemDisplayScene.name).items[0]
    
    let inventoryScene = _gameManager.sceneManager.getActiveScenesByClassName(InventoryScene.name).items[0]
    
    this.windowDimension = new Vector2(
      inventoryScene.windowDimension.x - inventoryItemDisplayScene.windowDimension.x - 5,
      inventoryScene.windowDimension.y/3*2
    )
    
    this.windowPos = new Vector2(
      inventoryScene.windowPos.x,
      inventoryScene.windowPos.y + inventoryScene.windowDimension.y - this.windowDimension.y
    )
    
    this.buttonDimension = new Vector2(this.windowDimension.x -2, this.buttonHeight)
  }
  
  displayModules(moduleManager)
  {
    this.clear()
    
    this.createWindowBackground()
    this.createInfoButton(moduleManager)
    this.createStatButton(moduleManager.spellCore)
    this.createLockButton(moduleManager.spellCore)

    let pos = new Vector2(1).add(this.windowPos)
    this.createLevelDisplay(moduleManager, pos)
    
    pos.add(this.levelHeight)
    
    let i = 0
    
    for(let key in moduleManager.modules)
    {
      if(i>0)
        pos.y += this.buttonHeight + this.buttonOffset
        
      i++
      this.createModuleButton(key, pos, moduleManager)
    }
  }
  
  createInfoButton(moduleManager)
  {
    let pos = this.windowPos.copy().add(new Vector2(0,this.windowDimension.y - 45 - 6))
  
    let size = new Vector2(this.windowDimension.x,15)
  
    let button = new TextButton(4, pos, size, 'blue','white', 'info', 
    () => {
      _gameManager.sceneManager.openScene(ModuleInfoScene, true).display(moduleManager)
    })
    
    this.addGUIObject(button)
  }
  
  createModuleButton(key, pos, moduleManager)
  {
    let moduleButton = new GameObject(pos.x, pos.y)
    this.addGUIObject(moduleButton)

    moduleButton.addComponent(new ModuleButtonComponent(
      moduleManager.getModule(key),
      this.buttonDimension,
      moduleManager
    ))
  }
  
  createLevelDisplay(moduleManager, pos)
  {
    this.createXPBar(pos, moduleManager)
    this.createXPText(pos, moduleManager)
    this.createLevelText(pos, moduleManager)
  }
  
  createLevelText(pos, moduleManager)
  {
    let level = new GameObject(pos.x+this.windowDimension.x/2, pos.y+this.xpBarHeight+1)
    let text = new TextRenderComponent(new Vector2(), 100,'black','center')
    text.addTextLine('level:'+moduleManager.level)
    level.addComponent(text)
    this.addGUIObject(level)
  }
  
  createXPText(pos, moduleManager)
  {
    this.createCurrentXPText(pos, moduleManager)
    this.createTargetXPText(pos, moduleManager)
  }
  
  createTargetXPText(pos, moduleManager)
  {
    let targetXP = new GameObject(pos.x+this.windowDimension.x, pos.y+this.xpBarHeight+1)
    let text = new TextRenderComponent(new Vector2(), 100,'black','end')
    text.addTextLine(Math.round(moduleManager.targetXP)+'')
    targetXP.addComponent(text)
    this.addGUIObject(targetXP)
  }
  
  createCurrentXPText(pos, moduleManager)
  {
    let currentXP = new GameObject(pos.x, pos.y+this.xpBarHeight+1)
    let text = new TextRenderComponent(new Vector2(), 100,'black')
    text.addTextLine(Math.round(moduleManager.xp)+'')
    currentXP.addComponent(text)
    this.addGUIObject(currentXP)
  }
  
  createXPBar(pos, moduleManager)
  {
    this.createXPBarBackground(pos)
    this.createXPBarFill(pos, moduleManager)
  }
  
  createXPBarBackground(pos)
  {
    let xpBarBack = new GameObject(pos.x, pos.y)
    xpBarBack.addComponent(new RectangleRenderComponent(new Vector2(this.windowDimension.x-2,this.xpBarHeight), 'black'))
    this.addGUIObject(xpBarBack)
  }
  
  createXPBarFill(pos, moduleManager)
  {
    let xpBar = new GameObject(pos.x+1, pos.y+1)
    let width = this.windowDimension.x-4
    width *= moduleManager.xpInPercent
    xpBar.addComponent(new RectangleRenderComponent(new Vector2(width,this.xpBarHeight-2), 'white'))
    this.addGUIObject(xpBar)
  }
  
  isModuleActive(moduleClassName, activeModules)
  {
    for(let i in activeModules)
      if(activeModules[i].constructor.name == moduleClassName)
        return true

    return false
  }
  
  createStatButton(spellCore)
  {
    let pos = this.windowPos.copy().add(new Vector2(0,this.windowDimension.y - 15))
  
    let size = new Vector2(this.windowDimension.x,15)
  
    let statButton = new TextButton(4, pos, size, 'red','white', 'attributes', () => {
      _gameManager.sceneManager.openScene(SpellAttributeDisplayScene,true).display(spellCore)
    })
    
    this.addGUIObject(statButton)
  }
  
  createLockButton(spellCore)
  {
    let pos = this.windowPos.copy().add(new Vector2(0,this.windowDimension.y - 30 - 3))
  
    let size = new Vector2(this.windowDimension.x,15)
  
    let button = new TextButton(4, pos, size, 'red','white', 'lock', 
    () => {
      spellCore.isLocked = !spellCore.isLocked
      _gameManager.sceneManager.getActiveScenesByClassName(InventoryItemDisplayScene.name).items[0].reload()
    })
    
    this.addGUIObject(button)
  }
}

console.log(SpellCoreDisplayScene.name+' loaded...')