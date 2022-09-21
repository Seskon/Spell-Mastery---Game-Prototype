class CollisionComponent extends Component
{
  ID = 'COLLISION'

  constructor(dimensions, offset, tag)
  {
    super()
    this.dimensions = dimensions
    this.offset = offset
    this.tag = tag
    this.trigger = false
  }

  setupComplete()
  {
    _gameManager.sceneManager.colliders.add(this)
  }

  setTrigger(triggerFunction)
  {
    this.trigger = true
    this.triggerFunction = triggerFunction
    return this
  }

  checkCollision(other)
  {
    if(!this.enabled || !this.gameObject.enabled)
      return false
    
    if (other === this || (!this.trigger && !other.trigger))
      return false
      
    if (this.gameObject.pos.y + this.offsetY 
      >= other.gameObject.pos.y + other.offsetY + other.height 
    || other.gameObject.pos.y + other.offsetY 
      >= this.gameObject.pos.y + this.offsetY + this.height )
      return false
      
    if (this.gameObject.pos.x + this.offsetX + this.width 
      <= other.gameObject.pos.x + other.offsetX 
    || this.gameObject.pos.x + this.offsetX 
     >= other.gameObject.pos.x + other.offsetX + other.width)
      return false

    this.overlap(other)

    return true
  }

  overlap(other)
  {
    if (this.trigger && !other.trigger)
    {
      this.onTrigger(other)
      return false
    }

    if (!this.trigger && other.trigger)
    {
      other.onTrigger(this)
      return false
    }
  }

  enabledRun()
  {
    if (Settings.drawCollider)
    {
      canvasContext.strokeStyle = 'pink'
      canvasContext.lineWidth = 1

      canvasContext.strokeRect(
        this.gameObject.pos.x + this.offset.x,
        this.gameObject.pos.y + this.offset.y, this.dimensions.x, this.dimensions.y)
    }
  }

  onTrigger(other)
  {
    this.triggerFunction(other)
  }

  onDestroy()
  {
    _gameManager.sceneManager.colliders.remove(this)
  }

  checkIfCornerInside(corner)
  {
    return checkIfPosInside(
      this.topLeftCorner(),
      this.dimensions,
      corner)
  }

  checkIfColliderFullyInside(c)
  {
    return (
      this.checkIfCornerInside(c.topLeftCorner()) &&
      this.checkIfCornerInside(c.topRightCorner()) &&
      this.checkIfCornerInside(c.bottomLeftCorner()) &&
      this.checkIfCornerInside(c.bottomRightCorner())
    )
  }

  topLeftCorner()
  {
    return new Vector2(
      this.gameObject.pos.x + this.offset.x,
      this.gameObject.pos.y + this.offset.y
    )
  }

  topRightCorner()
  {
    return new Vector2(
      this.gameObject.pos.x + this.offset.x + this.dimensions.x,
      this.gameObject.pos.y + this.offset.y
    )
  }

  bottomLeftCorner()
  {
    return new Vector2(
      this.gameObject.pos.x + this.offset.x,
      this.gameObject.pos.y + this.offset.y + this.dimensions.y
    )
  }

  bottomRightCorner()
  {
    return new Vector2(
      this.gameObject.pos.x + this.offset.x + this.dimensions.x,
      this.gameObject.pos.y + this.offset.y + this.dimensions.y
    )
  }
}

console.log(CollisionComponent.name+' loaded...')