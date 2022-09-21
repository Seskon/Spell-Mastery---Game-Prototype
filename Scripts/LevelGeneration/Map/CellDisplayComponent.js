class CellDisplayComponent extends Component
{
  color = 'white'
  
  constructor(cell, dimensions, content)
  {
    super()
    
    this.cell = cell
    this.dimensions = dimensions
    this.content = content
  }
  
  enabledRun()
  {
    if(this.cell == null)
      return
    
    let screenPos = this.gameObject.screenPos
    let halfDim = this.dimensions.copy().divide(2)
    
    let topLeft = screenPos.copy().subtract(halfDim)
    let topRight = screenPos.copy().add(new Vector2(halfDim.x, -halfDim.y))
    let bottomRight = screenPos.copy().add(halfDim)
    let bottomLeft = screenPos.copy().subtract(new Vector2(halfDim.x, -halfDim.y))
    
    if(this.cell[0])
      Paint.line(topLeft, topRight, this.color, 1)
    
    if(this.cell[1])
      Paint.line(topRight, bottomRight, this.color, 1)
      
    if(this.cell[2])
      Paint.line(bottomRight, bottomLeft, this.color, 1)
      
    if(this.cell[3])
      Paint.line(bottomLeft, topLeft, this.color, 1)
  }
}