class ModuleInfoScene extends Scene
{
  pageSize = new Vector2(100,200)
  
  load()
  {
    this.canvas = _gameManager.canvasManager.canvas
    this.createTextBook()
    this.createCloseButton()
  }
  
  createCloseButton()
  {
    let pos = new Vector2(this.canvas.width/2 + this.pageSize.x/2, this.canvas.height/2 - this.pageSize.y/2)
    
    let button = new TextButton(3, pos, new Vector2(10), 'red', 'red', '', () => {this.close()})
    
    this.addGUIObject(button)
  }
  
  close()
  {
    _gameManager.sceneManager.closeScene(this)
  }
  
  createTextBook()
  {
    let pos = new Vector2(this.canvas.width/2-this.pageSize.x/2, this.canvas.height/2-this.pageSize.y/2)
    
    this.book = new TextBook(this, pos, this.pageSize, 'black', 'white', () => {this.close()})
    
    this.addGUIObject(this.book)
  }
  
  display(moduleManager)
  {
    this.reload()
    
    let modules = Object.values(moduleManager.modules)
    
    for(let mod of modules)
      for(let page of mod.constructor.description)
        this.book.addPage(page)
  }
}