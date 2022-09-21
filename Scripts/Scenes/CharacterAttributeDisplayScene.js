class CharacterAttributeDisplayScene extends Scene
{
  buttonSize = new Vector2(50,15)
  margin = 5
  
  load()
  {
    this.createAttributeDisplay()
    this.displayAttributes()
  }
  
  displayAttributes()
  {
    let attributes =_gameManager.player.attributeSheet.attributes
    let keys = Object.keys(attributes)
    
    for(let key of keys)
      this.attributeDisplay.text.addTextLine(attributes[key].getModifiedValue() + ' ' + key.replace('_',' '))
  }
  
  createAttributeDisplay()
  {
    let canvas = _gameManager.canvasManager.canvas
    let dimension = new Vector2(canvas.width, canvas.height - this.buttonSize.y)
    
    this.attributeDisplay = new TextBlock(0,0,dimension,this.margin,'white','black')
    
    this.addGUIObject(this.attributeDisplay)
 
    this.createCloseButton(dimension)
  }
  
  createCloseButton(dimension)
  {
    let pos = new Vector2(0, dimension.y)
    let size = new Vector2(dimension.x, this.buttonSize.y)
    
    let button = new TextButton(4, pos, size, 'red', 'black', 'close', () => { _gameManager.sceneManager.removeScene(this)})
    
    this.addGUIObject(button)
  }
}