class EquipWheelComponent extends InputRecieverComponent
{
  squareSize = 5
  baseColor = 'blue'
  selectionColor = 'red'
  
  isVisible = false
  direction = new Vector2()
  
  constructor(layerIndex, dimensions, onEquip, onInfo)
  {
    super(layerIndex, dimensions)
    
    this.onEquip = onEquip
    this.onInfo = onInfo
  }
  
  onPointerDown(event, pos)
  {
    this.onInfo()
    this.isVisible = true
    this.calculateCenterPosition()
    this.selectedPos = this.centerPos.copy()

    return true
  }
  
  calculateCenterPosition()
  {
    this.centerPos = this.dimensions.copy().divide(2)
    this.centerPos.add(this.gameObject.screenPos)
    this.centerPos.subtract(new Vector2(this.squareSize/2))
  }
  
  enabledRun()
  {
    super.enabledRun()
    
    this.drawWheel()
  }
  
  onPointerMove(event, pos)
  {
    pos=_gameManager.canvasManager.screenPositionToCanvasPosition(pos)
    this.selectedPos = pos.copy()
    this.direction = this.centerPos.copy().normalizedDirection(pos)
    
    return true
  }
  
  isSelectionActive()
  {
    return this.selectedPos.copy().subtract(this.centerPos).length() > this.dimensions.x*2
  }
  
  onPointerUp(event, pos)
  {
    this.isVisible = false

    if(!this.isSelectionActive())
      return true
    
    let roundDir = this.direction.round()
    
    if(roundDir.x == 0 && roundDir.y == 0)
      return
    
    let index = roundDir.x +1 + roundDir.y+1 + 2 + roundDir.y*2
    this.onEquip(index)
    
    return true
  }
  
  drawSlotIndicator(x,y)
  {
     let pos = new Vector2(
      this.centerPos.x + x*this.dimensions.x,
      this.centerPos.y + y*this.dimensions.y
    )
    
    //check if the direction vector matches x,y by subtracting it and checking if result is zero
    let isInDirection = new Vector2(
      Math.round(this.direction.x) -x,
      Math.round(this.direction.y) -y
    )
    
    let color = isInDirection.x==0 && isInDirection.y==0? this.selectionColor : this.baseColor
    
    Paint.rectangle(color, pos, new Vector2(this.squareSize))
  }
  
  drawWheel()
  {
    if(!this.isVisible || !this.isSelectionActive())
      return
    
    this.drawSlotIndicator(-1,-1)
    this.drawSlotIndicator(0,-1)
    this.drawSlotIndicator(1,-1)
    this.drawSlotIndicator(-1,0)
    this.drawSlotIndicator(1,0)
    this.drawSlotIndicator(-1,1)
    this.drawSlotIndicator(0,1)
    this.drawSlotIndicator(1,1)
  }
}

console.log(EquipWheelComponent.name+' loaded...')