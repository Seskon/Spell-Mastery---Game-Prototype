class SpellAttributeDisplayScene extends Scene
{
  buttonSize = new Vector2(50,15)
  margin = 5
  
  load()
  {
    this.createAttributeDisplay()
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
    
    let button = new TextButton(5, pos, size, 'red', 'white', 'close', () => {
      _gameManager.sceneManager.removeScene(this)
    })
    
    this.addGUIObject(button)
  }
  
  display(spellCore)
  {
    this.attributeDisplay.text.clear()
    this.writeTags(spellCore)
    this.writeModifications(spellCore.attributeModifierCollector_temp.getCombinedModifierDescription())
    this.writeModifications(spellCore.attributeModifierCollector_equip.getCombinedModifierDescription())
  }
  
  writeTags(spellCore)
  {
    let tags = spellCore.attributeModifierCollector_equip.tagDictionary

    let tagstring = ''
    for(let tag of Object.keys(tags))
      tagstring = tagstring+'.'+tag
  
    this.attributeDisplay.text.addTextLine(tagstring)
  }
  
  writeModifications(descriptions)
  {
    for(let d of descriptions)
      this.attributeDisplay.text.addTextLine(d)
  }
}