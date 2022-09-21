class PlayerController extends GameObject
{
  borderOffset = 6
  outerRadius = 30
  innerRadius = 20
  
  constructor(layerIndex, player)
  {
    super(0,0)
    
    this.layerIndex = layerIndex
    this.player = player

    this.reposition()
    this.setupComponents()
    this.setupController()
  }
  
  setupComponents()
  {
    this.addComponent(new CircleRenderComponent(this.outerRadius,'white',1))
    
    this.addComponent(new ClickComponent(
      this.layerIndex-1, 
      new Vector2(this.outerRadius*2), 
      () => {},
      new Vector2(-this.outerRadius)
    ))
  }
  
  reposition()
  {
    this.moveTo(new Vector2(
      this.borderOffset + this.outerRadius,
      _gameManager.canvasManager.canvas.height - this.outerRadius - this.borderOffset
    ))
  }
  
  setupController()
  {
    let cPos = this.pos.copy()
    
    this.controller = new GameObject(cPos.x,cPos.y)
    this.addComponentsToController()
    
    this.player.addComponent(new MoveComponent(
    this.dragComponent.normalizedDirection))
    
    this.controller.isGUIElement = true
    this.addChild(this.controller)
  }
  
  addComponentsToController()
  {
    this.dragComponent = new DragComponent(
      this.layerIndex,
      new Vector2(this.innerRadius*2),
      new Vector2(this.outerRadius-this.innerRadius),
      true,
      false,
      new Vector2(-this.innerRadius)
    )
    
    this.controller.addComponent(this.dragComponent)
    this.controller.addComponent(new CircleRenderComponent(this.innerRadius,'white'))
  }
}

console.log(PlayerController.name+' loaded...')