class SpriteComponent extends SizedComponent {

  ID = 'SPRITE'
  centered = false

  constructor(src, offset = new Vector2()) {
    super()

    this.src = src
    this.offset = offset.round()
  }
  
  setTargetSize(targetSize)
  {
    this.targetSize = targetSize
  }

  setupComplete()
  {
    super.setupComplete()
    this.setImageSource(this.src)
  }

  draw() 
  {
    if(this.src == null)
      return

    let pos = this.calculatePosition()
    
    this.drawImage(pos)
    this.drawAnchor(pos)
  }
  
  drawImage(pos)
  {
    let context = _gameManager.canvasManager.canvasContext
    
    if(this.targetSize != null)
      context.drawImage(this.img, pos.x, pos.y, this.targetSize.x, this.targetSize.y)
    else
      context.drawImage(this.img, pos.x, pos.y)
  }
  
  calculatePosition()
  {
    let pos = this.gameObject.screenPos.copy()

    if(this.centered)
      pos.subtract(new Vector2(this.img.width/2, this.img.height/2))
    
    return pos.subtract(this.offset)
  }

  drawAnchor(pos)
  {
    if(Settings.showAnchor)
      Paint.rectangle('pink', this.gameObject.screenPos, new Vector2(1))
  }

  setImageSource(src)
  {
    this.src = src
    this.img = _images[src]
    
    if(this.img == null)
      this.setDimensions(0,0)
    else
      this.setDimensions(this.img.width, this.img.height)
  }
  
  setDimensions(width, height)
  {
    this.setWidth(width)
    this.setHeight(height)
  }

  enabledRun() {
    this.draw()
  }
}

console.log(SpriteComponent.name+' loaded...')