class GeneratorScene extends Scene
{
  generateByBlueprint(bluePrint, level)
  {
    this.bluePrint = bluePrint
    this.bluePrint.size = new Vector2(200, Math.min((level+2)*200,1000))
    this.level = level

    this.createBackground()
    this.createEnvironment()
    this.spawnEnemies()
    this.repositionPlayer()
    
    return this
  }
  
  repositionPlayer()
  {
    _gameManager.player.moveTo(new Vector2(this.bluePrint.size.x/2, this.bluePrint.size.y - this.bluePrint.size.x/3))
  }
  
  spawnEnemies()
  {
    if(!this.bluePrint.spawnEnemies)
      return
    
    let numClusters = (this.bluePrint.size.y-this.bluePrint.size.x*2)/this.bluePrint.clusterSpace
    
    numClusters = Math.round(numClusters)
    
    for(let i = 0; i < numClusters; i++)
      this.spawnCluster(i*100 + this.bluePrint.size.x)
      
    this.spawnBoss()
  }
  
  spawnBoss()
  {
    let pos = new Vector2(this.bluePrint.size.x/2, this.bluePrint.size.x/3)
    this.addGameObject(this.bluePrint.bossBluePrint.instantiate(pos, this.level, (event) => {this.onBossKill(event)}))
  }
  
  spawnCluster(height)
  {
    let x = Math.random() * (this.bluePrint.size.x - this.bluePrint.clusterRadius*2)
    let pos = new Vector2(x,height)
    
    let halfDensity = (this.bluePrint.clusterDensity * this.bluePrint.clusterRadius)/2
    let numEnemies = Math.round(halfDensity + Math.random() * halfDensity)
 
    for(let i = 0; i < numEnemies; i++)
      this.spawnEnemie(pos, this.bluePrint.clusterRadius)
  }
  
  spawnEnemie(pos, clusterRadius)
  {
    pos = pos.add(new Vector2(Math.random()*clusterRadius/2, Math.random()*clusterRadius/2))
    
    let types = this.bluePrint.enemieTypes
    let rIndex = Math.round(Math.random()*(types.length-1))
    let enemieBluePrint = types[rIndex]
    
    this.addGameObject(enemieBluePrint.instantiate(pos, this.level, (event) => {this.onEnemieKill(event)}))
    
    this.numEnemies++
  }
  
  onEnemieKill(event)
  {
    if(event.type == ExecutionTypes.onTrigger &&
      event.triggerType == SpellTriggerTypes.onKill)
        this.numEnemies--
  }
  
  onBossKill(event)
  {
    if(event.type == ExecutionTypes.onTrigger &&
      event.triggerType == SpellTriggerTypes.onDeath)
      {
        this.showTileSelectionButton()
        this.numEnemies--
      }
  }
  
  showTileSelectionButton()
  {
    let canvas = _gameManager.canvasManager.canvas
    let pos = new Vector2(canvas.width/2-25, 10)
    this.selectButton = new TextButton(3, pos, new Vector2(50,15), 'white', 'black', 'leave', () => {this.openNodeSelection()})
    this.addGUIObject(this.selectButton)
  }
  
  openNodeSelection()
  {
    this.removeGUIObject(this.selectButton)
    _gameManager.sceneManager.openScene(NodeSelectionScene).reroll()
    _gameManager.sceneManager.removeScene(this)
  }
  
  createEnvironment()
  {
    for(let prop of this.bluePrint.environmentProps)
      this.spawnEnvironmentProp(prop)
  }
  
  spawnEnvironmentProp(prop)
  {
    let amount = this.bluePrint.size.x*this.bluePrint.size.y*prop[1]
    let distance = this.bluePrint.size.copy().subtract(new Vector2(0,this.bluePrint.size.x))
    distance.subtract(new Vector2(60))
    SceneryClusterGenerator.generateCluster(this, new Vector2(0,this.bluePrint.size.x), prop[0], amount, distance)
  }
  
  createBackground()
  {
    let back = new GameObject(0,0)
    back.addComponent(new RectangleRenderComponent(this.bluePrint.size,this.bluePrint.backgroundColor))
    back.layer = 0
    this.addGameObject(back)
  }
}

console.log(GeneratorScene.name + ' loaded...')