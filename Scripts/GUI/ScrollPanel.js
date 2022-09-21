class ScrollPanel extends GameObject
{
  constructor(layerIndex,x,y,area,color)
  {
    super(x,y)
    this.layerIndex = layerIndex
    this.area = area
    
    this.addComponent(new DragComponent(area.x, area.y, area.y, {x:0,y:this.getHeightDifference(area.y+10)},false,true))
    
    this.addComponent(new RectangleRenderComponent(area,color))

  }
  
  getHeightDifference(height)
  {
    return Math.max(height - _canvas.height, 0)
  }
}

console.log(ScrollPanel.name+' loaded...')