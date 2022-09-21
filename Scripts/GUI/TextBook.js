class TextBook extends TextBlock
{
  pages = []
  index = 0
  buttonSize = new Vector2(15)
  
  constructor(scene, pos, dimension, backColor, textColor, exec)
  {
    super(pos.x, pos.y, dimension, 3, textColor, backColor)
    
    this.scene = scene
    this.dimension = dimension
    this.exec = exec

    this.createPageNavigation()
  }
  
  createPageNavigation()
  {
    let bottomCenter = new Vector2(this.dimension.x/2, this.dimension.y)
    bottomCenter.add(this.pos)
    
    this.createPageButtons(bottomCenter)
  }
  
  createPageButtons(pos)
  {
    pos.subtract(new Vector2(this.buttonSize.x+this.buttonSize.x/2,0))
    this.addLeftPageButton(pos)
    
    pos.add(new Vector2(this.buttonSize.x*2,0))
    this.addRightPageButton(pos)
  }
  
  addRightPageButton(pos)
  {
    this.right = this.createPageButton(pos, '>', 1)
    this.scene.addGUIObject(this.right)
  }
  
  addLeftPageButton(pos)
  {
    this.left = this.createPageButton(pos, '<', -1)
    this.scene.addGUIObject(this.left)
  }
  
  createPageButton(pos, text, direction)
  {
    return new TextButton(2, pos, this.buttonSize, 'white', 'black', text, () => {this.changePage(direction)})
  }
  
  destroy()
  {
    this.left.destroy()
    this.right.destroy()
    super.destroy()
  }
  
  changePage(direction)
  {
    if(this.index + direction >= this.pages.length)
      this.exec()
    
    this.index = Math.min(this.pages.length-1, Math.max(0, (this.index+direction)))
    
    this.updateText()
  }
  
  updateText()
  {
    this.text.clear()
    this.text.addTextLine(this.pages[this.index])
  }
  
  addPage(text)
  {
    if(text == null || text == '')
      return

    this.pages.push(text)
    this.updateText()
  }
}