class MainMenuScene extends Scene
{
  load()
  {
    this.canvas = _gameManager.canvasManager.canvas
    
    this.createTitle()
    this.createButtons()
  }
  
  createTitle()
  {
    let title = new GameObject(this.canvas.width/2-100,20)
    title.addComponent(new SpriteComponent('TitleText'))
    this.addGUIObject(title)
  }
  
  createButtons()
  {
    //this.createTutorialButton()
    this.createStartButton()
    this.createXButton()
  }
  
  createXButton()
  {
    let pos = new Vector2(this.canvas.width/2 -35, 150)
    let start = new TextButton(1, pos, new Vector2(70,20), 'white', 'black', 'Tutorial', () => {
      _gameManager.sceneManager.closeScene(this)
      _gameManager.sceneManager.openScene(PlayerScene)
      _gameManager.sceneManager.openScene(TutorialScene)
    })
    
    this.addGUIObject(start)
  }
  
  createTutorialButton()
  {
    let pos = new Vector2(this.canvas.width/2 -10, 220)
    let x = new TextButton(1, pos, new Vector2(20,20), 'white', 'black', 'X', () => {
      _gameManager.sceneManager.closeScene(this)
      _gameManager.sceneManager.openScene(PlayerScene)
      _gameManager.sceneManager.openScene(NodeSelectionScene).reroll()
      
      _gameManager.player.spawnCores()
    })
    
    this.addGUIObject(x)
  }
  
  createStartButton()
  {
    let pos = new Vector2(this.canvas.width/2 -25, 185)
    let start = new TextButton(1, pos, new Vector2(50,20), 'white', 'black', 'Start', () => {
      _gameManager.sceneManager.closeScene(this)
      _gameManager.sceneManager.openScene(PlayerScene)
      _gameManager.sceneManager.openScene(NodeSelectionScene).reroll()
    })
    
    this.addGUIObject(start)
  }
}