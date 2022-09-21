class InputRecieverComponent extends Component
{
  ID = 'INPUTRECIEVER'
  isRecieving = false
  
  constructor(layerIndex, dimensions, offset = new Vector2())
  {
    super()
    
    this.dimensions = dimensions
    this.layerIndex = layerIndex
    this.offset = offset

    _gameManager.inputManager.addSubscriber(this)
  }
  
  enabledRun()
  {
    this.drawInputArea()
  }
  
  drawInputArea()
  {
    if(!Settings.showInput)
      return
    
    let pos = this.gameObject.screenPos.copy().add(this.offset)
    Paint.rectangleOutline('red',pos,this.dimensions,1)
  }
  
  canRecieveInputAtPosition(pointerPos)
  {
    pointerPos = _gameManager.canvasManager.screenPositionToCanvasPosition(pointerPos)
    
    let offsetPos = this.gameObject.screenPos.copy().add(this.offset)
    
    return (this.canRecieveInput() && Utility.isPositionInsideArea(offsetPos,this.dimensions,pointerPos))
  }
  
  canRecieveInput()
  {
    return this.enabled && this.active && (this.gameObject.scene != null && this.gameObject.scene.active)
  }
  
  onDestroy()
  {
    _gameManager.inputManager.removeSubscriber(this)
  }
  
  onPointerDown(event, pos) {return false}
  
  onPointerUp(event, pos) {}
  
  onPointerMove(event, pos) {}
}

console.log(InputRecieverComponent.name+' loaded...')