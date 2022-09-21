class TextRenderComponent extends Component
{
  ID = 'TEXTRENDER'
  
  text = new List()
  
  dimension = new Vector2()
  offset = new Vector2(3, 3)
  lineHeight = 8
  font = '5px PixelFont'
  
  constructor(offset, maxWidth, color = 'black', textAlign = 'start')
  {
    super()
    this.offset = offset
    this.maxWidth = maxWidth
    this.color = color
    this.textAlign = textAlign

    this.canvasContext = _gameManager.canvasManager.canvasContext
  }
  
  addTextLine(textLine)
  {
    this.text.add(textLine)
  }
  
  enabledRun()
  {
    this.render()
  }
  
  render()
  {
    this.setupCanvasContext()
    this.renderText()
  }
  
  renderText()
  {
    let pos = this.gameObject.screenPos.copy().round()
    let currentPos = pos.copy().add(this.offset).round()
    
    for(let line of this.text.items)
      this.renderWrappedTextLine(line, currentPos)
    
    this.dimension.y = currentPos.y + this.offset.y - pos.y
  }
  
  setupCanvasContext()
  {
    this.canvasContext.font = this.font
    this.canvasContext.fillStyle = this.color
    this.canvasContext.textBaseline = 'top'
    this.canvasContext.textAlign = this.textAlign
  }

  renderWrappedTextLine(text, pos)
  {
    let words = text.split(' ')
    let line = ''
    
    for (let [index, word] of words.entries()) 
      line = this.addWordToLine(line, word, index, pos)
    
    this.writeTextLine(line, pos, (this.lineHeight+2)*2)
  }
  
  addWordToLine(line, word, index, pos)
  {
    const nextLine = line + word + ' '
      
    if(this.isLineOutOfBounds(nextLine, index)) 
      return this.wrapText(line, word, index, pos)
    else
      return nextLine
  }
  
  wrapText(line, word, index, pos)
  {
    this.writeTextLine(line, pos, this.lineHeight+2)
    return word + ' '
  }
  
  writeTextLine(line, pos, yOffset)
  {
    this.canvasContext.fillText(line, pos.x, pos.y)
    pos.y += yOffset
  }
  
  isLineOutOfBounds(line, index)
  {
    return index > 0 && this.calcLineWidth(line) > this.maxWidth
  }
  
  calcLineWidth(line)
  {
    let metrics = this.canvasContext.measureText(line);
    return metrics.width;
  }
  
  clear()
  {
    this.text.clear()
  }
}

console.log(TextRenderComponent.name+' loaded...')