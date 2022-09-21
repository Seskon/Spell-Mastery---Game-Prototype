class CircleRenderComponent extends SizedComponent
{
  ID = "CIRCLERENDER"

  constructor(radius, color, lineWidth = 0)
  {
    super()
    
    this.radius = radius
    this.width = radius * 2
    this.height = radius * 2
    this.color = color
    this.lineWidth = lineWidth
  }
  
  setupComplete()
  {
    this.screenPos = this.gameObject.screenPos
    this.canvasContext = _gameManager.canvasManager.canvasContext
  }

  enabledRun()
  {
    this.draw()
  }
  
  draw()
  {
    if(this.lineWidth < 1)
      this.drawFilledCircle()
    else
      this.drawCircleOutline()
  }
  
  drawFilledCircle()
  {
    this.canvasContext.fillStyle = this.color
      
    this.drawCircle()
    this.canvasContext.fill()
  }
  
  drawCircleOutline()
  {
    this.canvasContext.strokeStyle = this.color
    this.canvasContext.lineWidth = this.lineWidth

    this.drawCircle()
    this.canvasContext.stroke()
  }
  
  drawCircle()
  {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      Math.round(this.screenPos.x),
      Math.round(this.screenPos.y),
      Math.round(this.radius), 0, 2 * Math.PI)
  }
}

console.log(CircleRenderComponent.name+' loaded...')