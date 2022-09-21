class TextButton extends GameObject
{
  constructor(layerIndex, pos, size, color, textColor, text, exec)
  {
    super(pos.x, pos.y)
    
    this.layerIndex = layerIndex
    this.size = size
    this.color = color
    this.textColor = textColor
    this.text = text
    this.exec = exec
    
    this.setupComponents()
  }
  
  setupComponents()
  {
    this.addComponent(new RectangleRenderComponent(this.size, this.color))
    
    this.setupTextComponent()
    
    this.addComponent(new ClickComponent(this.layerIndex, this.size, this.exec))
  }
  
  setupTextComponent()
  {
    this.textComp = new TextRenderComponent(new Vector2(this.size.x/2,this.size.y/3), this.size.x, this.textColor, 'center')
    
    this.textComp.addTextLine(this.text)
    this.addComponent(this.textComp)
  }
}

console.log(TextButton.name+' loaded...')