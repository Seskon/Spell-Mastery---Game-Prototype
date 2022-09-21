class Paint
{
  static rectangle(color, position, area, isCentered = false)
  {
    if(isCentered)
      position = area.copy().divide(-2).add(position)
    
    position = position.round()
    area = area.copy().round()
    
    let canvasContext = _gameManager.canvasManager.canvasContext
    
    canvasContext.fillStyle = color
    canvasContext.beginPath()
    canvasContext.fillRect(position.x, position.y, area.x, area.y)
  }
  
  static rectangleOutline(color, position, area, lineWidth, isCentered = false)
  {
    if(isCentered)
      position = area.copy().divide(-2).add(position)
    
    position = position.round()
    area = area.copy().round()
    
    let canvasContext = _gameManager.canvasManager.canvasContext
    canvasContext.strokeStyle = color
    canvasContext.lineWidth = lineWidth
    
    canvasContext.beginPath()
    canvasContext.strokeRect(
      position.x, position.y,
      area.x, area.y)
  }
  
  static generateRandomColor(min, max, locked)
  {
    var c = 256 - min - max
  
    var rgb = [
      Math.floor(Math.random() * c + min),
      Math.floor(Math.random() * c + min),
      Math.floor(Math.random() * c + min)];
  
    var colorSelect = Math.round(Math.random() * 6)
    while (locked.includes(colorSelect))
      colorSelect = Math.round(Math.random() * 6)
  
    rgb = reduceColor(rgb, colorSelect)
  
    return 'rgb(' + rgb.join(', ') + ')';
  }
  
  static reduceColor(color, i)
  {
    if (i == 1 || i == 2 || i == 3)
    {
      color[0] = 0
    }
  
    if (i == 0 || i == 2 || i == 4)
    {
      color[1] = 0
    }
  
    if (i == 0 || i == 1 || i == 5)
    {
      color[2] = 0
    }
  
    return color
  }
  
  static filledCircle(pos, radius, startAngle, endAngle, color)
  {
    let canvasContext = _gameManager.canvasManager.canvasContext
    canvasContext.fillStyle = color

    canvasContext.beginPath()
    canvasContext.arc(pos.x,pos.y,radius,startAngle,endAngle,color)
    canvasContext.fill()
  }
  
  static circelOutline(pos, radius, startAngle, endAngle, color, lineDash = [])
  {
    let canvasContext = _gameManager.canvasManager.canvasContext
    canvasContext.strokeStyle = color
    canvasContext.lineWidth = 1
    canvasContext.setLineDash(lineDash)
  
    canvasContext.beginPath()
    canvasContext.arc(pos.x,pos.y,radius,startAngle,endAngle,color)
    canvasContext.stroke()
    canvasContext.setLineDash([])
  }
  
  static line(from, target, color, width, lineDash = [])
  {
    let canvasContext = _gameManager.canvasManager.canvasContext
    canvasContext.strokeStyle = color
    canvasContext.lineWidth = width
    canvasContext.setLineDash(lineDash)
    
    canvasContext.beginPath()
    canvasContext.moveTo(from.x, from.y)
    canvasContext.lineTo(target.x, target.y)
    canvasContext.stroke()
    
    canvasContext.setLineDash([]) //reset
  }

}

console.log(Paint.name+' loaded...')