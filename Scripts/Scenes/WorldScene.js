class WorldScene extends Scene
{
  cellDimension = new Vector2(12)
  
  load()
  {
    this.cameraTarget = new GameObject(0,0)
    this.addGameObject(this.cameraTarget)
    
    this.controller = new PlayerController(3, this.cameraTarget)
    this.addGUIObject(this.controller)
    
    this.world = new World()
    console.log(this.world.maze)
    
    let test = new GameObject(0,0)
    test.addComponent(new RectangleRenderComponent(new Vector2(10), 'green', 0, true))
    this.addGameObject(test)
  }
  
  beforeActive()
  {
    _gameManager.sceneManager.cameraTarget = this.cameraTarget
    
    this.createCells()
    //display world
  }
  
  createCells()
  {
    let dimensions = this.world.maze.dimensions
    console.log(dimensions)
    for(let x = 0; x < dimensions.x; x++)
      for(let y = 0; y < dimensions.y; y++)
        this.createCellObject(new Vector2(x,y))
  }
  
  createCellObject(pos)
  {
    let cell = new GameObject(pos.x * this.cellDimension.x, pos.y * this.cellDimension.y)
    
    cell.addComponent(new CellDisplayComponent(
      this.world.maze.getCell(pos),
      this.cellDimension,
      null
    ))
    
    this.addGameObject(cell)
  }
}