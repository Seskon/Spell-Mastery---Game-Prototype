class TutorialScene extends Scene
{
  static blueprint = new SceneBluePrint(new Vector2(200,400), 0, 0, false, null, null, [['Tree', 0.001]], '#91EE7CFF')
  
  load()
  {
    this.canvas = _gameManager.canvasManager.canvas
    
    this.genScene = _gameManager.sceneManager.openScene(GeneratorScene).generateByBlueprint(TutorialScene.blueprint,1)
    
    this.createSkipButton()
    this.createWelcomTextBook()
  }
  
  createWelcomTextBook()
  {
    let dimension = new Vector2(this.canvas.width/4*3, this.canvas.height/2)
    let pos = new Vector2(this.canvas.width/2, this.canvas.height/3)
    pos.subtract(dimension.copy().divide(2))
    
    let welcome = new TextBook(this, pos, dimension, 'white', 'black', () => {
      
    })
    
    welcome.addPage('Welcome to Spell Mastery! This is only a prototype with basic content. The prototype showcases a modular based spell creation system where you can create your own spells by combining various modules. You can also improve them as well as your characters attributes buy completing Zones. This protype is created for mobile devices, you controle everything by touching with your fingers...')
    
    welcome.addPage('In the Bottom left corner is the controller. It allows you to move the character by draging it. It is also bound to time, the further you move it the faster time passes by...')
    
    welcome.addPage('In the bottom right corner is the button to open your inventory. This is where you can inspect and equip spell cores. To inspect a spellcore you can just touch it and it will show its information in the left bottom pannel. If you want to equip it, hold and drag the core in a certain direction. It will indicate which slot it is targeting. ...')
    
    welcome.addPage('To activate or deactivate a module, touch it. Activated modules will turn blue. Note that the active module number is equal to the current level of the spell core. Equipped cores will gain experience when you defeat enemies. They also get stat bonuses from the passive tree when you place a new node ...')

    welcome.addPage('As said before, once you complete a map, by defeating its boss, you recieve a new Node. They are completely random and will give stat bonuses to your character aswell as your spell cores. You can only place nodes if the lines match. If you can not place any further nodes, the game is over.')

    welcome.addPage('Placing a node will open up a new zone. The zones level is determined by the nodes distance to the center of the passive tree. Each red box in the passive tree is a higher level area')

    this.addGUIObject(welcome)
  }
  
  createSkipButton()
  {
    let size = new Vector2(50,15)
    let pos = new Vector2(this.canvas.width/2-size.x/2, 5)
    let skip = new TextButton(2, pos, size, 'white', 'black', 'skip', () => {this.skip()})
    this.addGUIObject(skip)
  }
  
  skip()
  {
    _gameManager.sceneManager.removeScene(this.genScene)
    _gameManager.sceneManager.removeScene(this)
    _gameManager.sceneManager.openScene(NodeSelectionScene,true).reroll()
  }
}

console.log(TutorialScene.name + ' loaded...')