class ModuleButtonComponent extends Component
{
  ID = 'MODULESYMBOL'

  symbolSize = 10
  symbolDistance = 1
  symbolSpace = this.symbolSize + this.symbolDistance
  numSymbols = new Vector2(6,7)
  isActive = false
  
  constructor(module, dimensions, moduleManager)
  {
    super()
    
    this.module = module
    this.dimensions = dimensions
    this.moduleManager = moduleManager
  }
  
  setupComplete()
  {
    this.setupClickComponent()
    this.setupTextRenderComponent()
  }
  
  setupClickComponent()
  {
    this.gameObject.addComponent(new ClickComponent(
      4, this.dimensions, () => {this.onClick()}
    ))
  }
  
  setupTextRenderComponent()
  {
    this.text = new TextRenderComponent(new Vector2(this.symbolSpace,1))
    this.text.addTextLine(this.module.constructor.displayName)
    this.gameObject.addComponent(this.text)
  }
  
  enabledRun()
  {
    let color = this.module.active?'blue':'red'
    color = this.module.isTemporary?'green':color
    this.drawFrame(color)
  }
  
  drawFrame(color)
  {
    Paint.rectangleOutline(color,this.gameObject.screenPos,this.dimensions)
  }
  
  onClick()
  {
    this.moduleManager.toggelModule(this.module)
  }
}

console.log(ModuleButtonComponent.name+' loaded...')