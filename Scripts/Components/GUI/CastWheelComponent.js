class CastWheelComponent extends InputRecieverComponent
{
  ID = 'CASTWHEEL'
  
  margin = 3
  squareSize = 2
  baseColor = 'white'
  selectionColor = 'red'
  disabledColor = 'gray'
  
  constructor(layerIndex, player)
  {
    super(layerIndex, new Vector2(
      _gameManager.canvasManager.canvas.width, 
      _gameManager.canvasManager.canvas.height
    ))
    
    this.isVisible = false
    this.player = player

    this.range = player.attributeSheet.getAttribute('range')
  }
  
  drawSpellIndicator(gridPosition)
  {
    let pos = this.calculateIndicatorPosition(gridPosition)
    let color = this.directionToColor(gridPosition)
    Paint.rectangle(color, pos, new Vector2(this.squareSize))
  }
  
  calculateIndicatorPosition(gridPosition)
  {
    let pos = gridPosition.copy()
    pos.multiply(this.margin)
    pos.add(this.targetPos)
    
    return pos
  }
  
  directionToColor(gridPosition)
  {
    let color = this.baseColor
    
    if(this.isCoreDisabled(gridPosition))
        color = this.disabledColor
    else if(gridPosition.equals(this.direction.round()))
        color = this.selectionColor
    
    return color
  }
  
  isCoreDisabled(gridPosition)
  {
    return (!this.isCoreAvailableAtGridPosition(gridPosition) || !this.player.canCast)
  }
  
  isCoreAvailableAtGridPosition(gridPosition)
  {
    let index = this.directionToIndexPos(gridPosition)
    let core = this.player.equipment.getItem('core', index)
    
    return (core != null && core.isCastable(this.player))
  }
  
  enabledRun()
  {
    //this.drawRange()
    this.drawWheel()
  }
  
  drawRange()
  {
    let dim = this.player.getDimension().copy().divide(2)
    let pos = dim.add(this.player.screenPos)
    
    Paint.circelOutline(pos, this.range.getModifiedValue(), 0, Math.PI * 2, '#00000033', [5,15])
  }
  
  onPointerDown(event, pos)
  {
    pos = _gameManager.canvasManager.screenPositionToCanvasPosition(pos)
    this.targetPos = pos.round()
    this.isVisible = true
    this.direction = new Vector2()
    this.calculateMarkerPosition()
    return true
  }
  
  calculateMarkerPosition()
  {
    this.markerPos = this.targetPos.copy()
    this.markerPos.subtract(this.player.screenPos)
    this.markerPos.add(this.player.pos)
  }
  
  onPointerMove(event, pos)
  {
    pos = _gameManager.canvasManager.screenPositionToCanvasPosition(pos)
    this.direction = this.targetPos.copy().normalizedDirection(pos)
  }
  
  drawWheel()
  {
    if(!this.isVisible)
      return
    
    this.drawSpellIndicator(new Vector2(-1,-1))
    this.drawSpellIndicator(new Vector2(0,-1))
    this.drawSpellIndicator(new Vector2(1,-1))
    this.drawSpellIndicator(new Vector2(-1,0))
    this.drawSpellIndicator(new Vector2(1,0))
    this.drawSpellIndicator(new Vector2(-1,1))
    this.drawSpellIndicator(new Vector2(0,1))
    this.drawSpellIndicator(new Vector2(1,1))
  }
  
  //turn 9x9 grid position into array index
  directionToIndexPos(direction)
  {
    let gridPos = direction.round()
    return gridPos.x + gridPos.y + 4 + gridPos.y*2
  }
  
  onPointerUp(event, pos)
  {
    this.isVisible = false
    this.requestSpellCast()
  }
  
  requestSpellCast()
  {
    let index = this.directionToIndexPos(this.direction)
    let core = this.player.equipment.getItem('core', index)
    
    if(core != null)
      core.requestCast(this.player,this.markerPos, 0)
  }
}

console.log(CastWheelComponent.name+' loaded...')