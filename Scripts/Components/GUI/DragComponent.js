class DragComponent extends InputRecieverComponent {

  ID = 'DRAG'

  constructor(layerIndex, dimensions, maxDistance = new Vector2(1000), reset = false, isSquare = false, offset = new Vector2())
  {
    super(layerIndex, dimensions, offset)
    
    this.maxDistance = maxDistance
    this.reset = reset
    
    this.direction = new Vector2()
    this.normalizedDirection = new Vector2()
    
    this.isSquare = isSquare
    
    this.distance = 0
    this.percentDistance = 0
  }

  setupComplete()
  {
    this.origin = this.gameObject.pos.copy()
  }
  
  onPointerDown(event, pos)
  {
    this.initialOffset = pos.copy()
    this.initialOffset.subtract(this.gameObject.screenPos)

    return true
  }
  
  onPointerMove(event, pos)
  {
    if(this.isSquare)
      this.dragObjectSquared(pos)
    else
      this.dragObjectCircular(pos)
  }
  
  onPointerUp()
  {
    this.resetDrag()
  }

  resetDrag()
  {
    if (this.reset)
    {
      this.gameObject.moveTo(this.origin)

      this.direction.multiply(0)
      this.normalizedDirection.multiply(0)
      
      this.percentDistance = 0
      this.distance = 0
    }
  }
  
  dragObjectSquared(pos)
  {
    let nextPos = pos.copy()
    nextPos.subtract(this.initialOffset)
    
    if(Math.abs(nextPos.x - this.origin.x) > this.maxDistance.x)
      nextPos.x = this.gameObject.pos.x
    
    if (Math.abs(nextPos.y - this.origin.y) > this.maxDistance.y)
      nextPos.y = this.gameObject.pos.y
    
    this.gameObject.moveTo(nextPos)
  }

  dragObjectCircular(pos)
  {
    let nextPos = pos.copy()
    nextPos.subtract(this.initialOffset)
    
    this.calculateDragValues(nextPos)
    
    if(Math.abs(this.distance) > this.maxDistance.x)
      nextPos = this.getMaxDistancePosition()
    
    this.gameObject.moveTo(nextPos)
    this.percentDistance = this.distance/this.maxDistance.x
  }
  
  calculateDragValues(nextPos)
  {
    this.direction = this.origin.copy()
    this.direction.subtract(nextPos)
    
    this.distance = this.direction.length()
    
    this.normalizedDirection.copyValues(this.direction)
    this.normalizedDirection.divide(this.distance)
  }
  
  getMaxDistancePosition()
  {
    let max = this.direction.copy()
    max.divide(this.distance)
    max.multiply(this.maxDistance.x)

    let nextPos = this.origin.copy()
    nextPos.subtract(max)
      
    this.distance = this.maxDistance.x
    
    return nextPos
  }
}

console.log(DragComponent.name+' loaded...')