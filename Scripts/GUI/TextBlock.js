class TextBlock extends GameObject
{
  constructor(x,y,dimension,margin,textColor,backColor)
  {
    super(x,y)
    
    this.dimension = dimension
    this.margin = margin
    this.textColor = textColor
    this.backColor = backColor
    
    this.setupComponents()
  }
  
  setupComponents()
  {
    this.addComponent(new RectangleRenderComponent(this.dimension, this.backColor))
    
    this.addTextRenderComponent()
  }
  
  addTextRenderComponent()
  {
    let maxWidth = this.dimension.x - this.margin*2
    let offset = new Vector2(this.margin)
    let alignment = 'start'

    this.text = new TextRenderComponent(offset, maxWidth, this.textColor, alignment)
    
    this.addComponent(this.text)
  }
}