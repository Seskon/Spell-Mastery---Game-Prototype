class GameManager
{
  audioPlayer = new AudioPlayer()
  canvasManager = new CanvasManager(new Vector2(220, 400), 95)
  
  
  fps = 60
  frameDisplayTime = 1000/this.fps
  gameSpeed = 1

//gets called when all images are loaded
  startGame()
  {
    this.inputManager = new InputManager(this.canvasManager.canvas)
    this.sceneManager = new SceneManager()
    this.runManager = new RunManager()
    this.sceneManager.openScene(MainMenuScene)
    console.log('starting the game loop...')
    
    this.canvasManager.setTouchAction(false)
    this.isGameLooping = true
    this.pauseGameplay = false

    this.lastFrameTime = performance.now()

    this.runGamePlayLoop()
  }

  runGamePlayLoop() 
  {
    if(this.isGameLooping)
      requestAnimationFrame(() => { this.runGamePlayLoop() })
    else
      requestAnimationFrame(() => { this.startGame() })
      
    this.runTimedFrame()
    this.calculateGameSpeed()
  }
  
  runTimedFrame()
  {
    let currentFrameTime = performance.now()
    let timeElapsed = currentFrameTime - this.lastFrameTime
    
    if(timeElapsed > this.frameDisplayTime)
    {
      this.lastFrameTime = currentFrameTime - (timeElapsed % this.frameDisplayTime)
      
      this.runOnLimitedFps()
    }
  }
  
  runOnLimitedFps()
  {
    this.runManager.reset()
    this.drawBackground()
    
    this.sceneManager.collectActiveGameObjects()
    this.runManager.runActiveGameObjects()
    
    this.sceneManager.collectActiveGUIObjects()
    this.runManager.runActiveGUIObjects()
  }

  calculateGameSpeed() 
  {
    if(this.player == null)
      return
    
    let playerScene = this.sceneManager.getActiveScenesByClassName(PlayerScene.name).items[0]
    let distance = playerScene.playerController.dragComponent.percentDistance
    
    if(distance != null)
      this.gameSpeed = Math.min(Math.max(distance, 0.4),1)
      
    this.frameDisplayTime = 1000 / (this.fps * this.gameSpeed)
  }
  
  drawBackground()
  {
    let dimension = new Vector2(
      this.canvasManager.canvas.width,
      this.canvasManager.canvas.height
    )
    
    Paint.rectangle('black', new Vector2(), dimension)
  }
}

console.log(GameManager.name+' loaded...')
var _gameManager = new GameManager()
console.log("GameManager created...")