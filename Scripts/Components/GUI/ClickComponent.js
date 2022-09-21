class ClickComponent extends InputRecieverComponent {

  ID = 'CLICK'

  constructor(layerIndex, dimensions, exec, offset = new Vector2())
  {
    super(layerIndex, dimensions, offset)
    
    this.exec = exec
  }
  
  onPointerDown()
  {
    return true
  }
  
  onPointerUp(event, pos)
  {
    if(this.canRecieveInputAtPosition(pos))
      this.exec()
  }
}

console.log(ClickComponent.name+' loaded...')