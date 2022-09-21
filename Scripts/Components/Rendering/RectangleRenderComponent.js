class RectangleRenderComponent extends SizedComponent
{
  ID = 'RECTRENDER'
  
  constructor(dimension, color, thickness = 0, isCentered = false, offset = new Vector2())
  {
    super()
    
    this.dimension = dimension
    this.color = color
    this.thickness = thickness
    this.isCentered = isCentered
    this.offset = offset
  }

  enabledRun()
  {
    this.draw()
  }
  
  draw()
  {
    let pos = this.gameObject.screenPos.copy().add(this.offset)
    
    if(this.thickness < 1)
      Paint.rectangle(this.color, pos, this.dimension, this.isCentered)
    else
      Paint.rectangleOutline(this.color, pos, this.dimension, this.thickness, this.isCentered)
  }
}

console.log(RectangleRenderComponent.name+' loaded...')